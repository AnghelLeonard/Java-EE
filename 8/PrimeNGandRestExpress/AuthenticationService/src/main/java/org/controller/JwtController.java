package org.controller;

import com.auth0.jwt.JWTSigner;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.JWTVerifyException;
import com.auth0.jwt.internal.org.apache.commons.codec.binary.Base64;
import java.io.IOException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.SignatureException;
import java.util.HashMap;
import java.util.Map;
import org.restexpress.Request;
import org.restexpress.Response;

import org.authentication.Constants;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.regex.Pattern;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import org.apache.commons.lang3.exception.ExceptionUtils;
import org.authentication.Configuration;
import org.slf4j.LoggerFactory;

public class JwtController {

    private static final org.slf4j.Logger LOG = LoggerFactory.getLogger(Configuration.class);
    
    private final int port;
    private final String baseUrl;
    private final int jwtExpireLength;
    private final String jwtIssuer;

    /**
     *
     * @param baseUrl
     * @param port
     * @param jwtExpireLength
     * @param jwtIssuer
     */
    public JwtController(String baseUrl, int port, int jwtExpireLength, String jwtIssuer) {
        super();
        this.baseUrl = baseUrl;
        this.jwtExpireLength = jwtExpireLength;
        this.jwtIssuer = jwtIssuer;
        this.port=port;        
    }

    /**
     *
     * @param request
     * @param response
     * @return Object
     */
    public Object createJwt(Request request, Response response) {
        
        LOG.info("Request to create a new JWT ...");
        
        String apiKey, secret, jwt;

        try {
            apiKey = request.getQueryStringMap().get(Constants.Url.API_KEY);
            if (apiKey == null) {
                LOG.info("request.getQueryStringMap().get(Constants.Url.API_KEY)"
                        + " failed: API key is null");
                return "API key is null";
            }
            secret = request.getQueryStringMap().get(Constants.Url.SECRET);
            if (secret == null) {
                LOG.info("request.getQueryStringMap().get(Constants.Url.SECRET)"
                        + " failed: Secret is null");
                return "Secret is null";
            }

            // http://www.epochconverter.com/
            long epoch_now = System.currentTimeMillis() / 1000;
            long epoch_expire = epoch_now + jwtExpireLength;

            JWTSigner jwts = new JWTSigner(secret);
            Map<String, Object> payload = new HashMap<>();
            payload.put("iss", jwtIssuer);
            payload.put("ait", epoch_now);
            payload.put("exp", epoch_expire);
            payload.put("apiKey", apiKey);
            jwt = jwts.sign(payload);
        } catch (Exception e) {
            LOG.error("Request to create a new JWT failed: {}", ExceptionUtils.getRootCauseMessage(e));
            LOG.debug("Request to create a new JWT (#createJwt()) failed: {}", ExceptionUtils.getStackTrace(e));
            return "JWT creation failed";
        }
        
        LOG.info("Request to create a new JWT successfully ended ...");
        
        return jwt;
    }

    /**
     *
     * @param request
     * @param response
     * @return Object
     */
    public Object validateJwt(Request request, Response response) {
        
        LOG.info("Request to validate a JWT ...");
        
        try {
            String jwt = request.getHeader(Constants.Url.JWT, "No JWT supplied");
            String alg = getSignatureAlgorithm(jwt);
            String apiKey = getApiKey(jwt);            
            String secret = getSecret(apiKey);
            
            Map<String, Object> decodedPayload
                    = new JWTVerifier(secret).verify(jwt);

            if (!alg.equals("HS256") // prevent hack using 'none'
                    || Long.parseLong(decodedPayload.get("exp").toString())
                    <= System.currentTimeMillis() / 1000) {
                return false;
            }
        } catch (RuntimeException | NoSuchAlgorithmException | InvalidKeyException | IOException | SignatureException | JWTVerifyException e) {
            LOG.error("Request to validate a JWT failed: {}", ExceptionUtils.getRootCauseMessage(e));           
            LOG.debug("Request to validate a JWT (#validateJwt()) failed: {}", ExceptionUtils.getStackTrace(e));
            return false;
        }

        LOG.info("Request to validate a JWT successfully ended ...");
        
        return true;
    }

    private String getApiKey(String jwt) {
        
        LOG.info("Request to get the API key ...");
        
        String apiKey = "";
        try {
            String[] base64EncodedSegments = jwt.split(Pattern.quote("."));
            String base64EncodedClaims = base64EncodedSegments[1];
            byte[] decoded = Base64.decodeBase64(base64EncodedClaims);
            String claims = new String(decoded, "UTF-8") + "\n";
            JSONParser parser = new JSONParser();
            JSONObject json = (JSONObject) parser.parse(claims);
            LOG.info("The JWT claims: {}", json.toJSONString());
            apiKey = json.get("apiKey").toString();
        } catch (UnsupportedEncodingException | ParseException e) {
            LOG.error("The request to the an API key failed: {}", ExceptionUtils.getRootCauseMessage(e));
            LOG.debug("The request to get an API key (#getApiKey()) failed: {}", ExceptionUtils.getStackTrace(e));
            return "Get API key failed";
        }
        
        LOG.info("Request to get the API key successfully ended ...");
        
        return apiKey;
    }

    private String getSignatureAlgorithm(String jwt) {
        
        LOG.info("Request to get the signature algorithm from JWT ...");
        
        String alg = "";
        try {
            String[] base64EncodedSegments = jwt.split(Pattern.quote("."));
            String base64EncodedHeader = base64EncodedSegments[0];
            byte[] decoded = Base64.decodeBase64(base64EncodedHeader);
            String header = new String(decoded, "UTF-8") + "\n";
            JSONParser parser = new JSONParser();
            JSONObject json = (JSONObject) parser.parse(header);
            LOG.info("The JWT header is: {}", json.toJSONString());
            alg = json.get("alg").toString();
        } catch (UnsupportedEncodingException | ParseException e) {
            LOG.error("The request to get the signature algorithm from JWT failed: {}", ExceptionUtils.getRootCauseMessage(e));
            LOG.debug("The request to get the signature algorithm from JWT (#getSignatureAlgorithm()) failed: {}", ExceptionUtils.getStackTrace(e));
            return "Get signature algorithm failed";
        }
        
        LOG.info("Request to get the signature algorithm successfully ended ...");
        
        return alg;
    }

    private String getSecret(String apiKey) {
        
        LOG.info("Request to get the secret based on API key ...");
        
        String output, secret = "";
        try {
            URL url = new URL("http://" + baseUrl + ":" + String.valueOf(port) + "/clients/find/secret");
            LOG.info("Authentication service URL called: {}", url);

            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Accept", "application/json");
            conn.setRequestProperty("filter", "apiKey::" + apiKey);

            if (conn.getResponseCode() != 200) {            
                return String.valueOf("Failed : HTTP error code : "
                        + conn.getResponseCode());
            }

            BufferedReader br = new BufferedReader(new InputStreamReader(
                    (conn.getInputStream())));

            while ((output = br.readLine()) != null) {
                secret = output;
            }
            
            conn.disconnect();
        } catch (IOException e) {
            LOG.error("The request to get the secret based on API key failed: {}", ExceptionUtils.getRootCauseMessage(e));
            LOG.debug("The request to get the secret based on API key (#getSecret()) failed: {}", ExceptionUtils.getStackTrace(e));
            return "Get secret failed";
        }
        
        LOG.info("Request to get the secret based on API key successfully ended ...");
        
        return secret.replaceAll("\"", "");
    }
}
