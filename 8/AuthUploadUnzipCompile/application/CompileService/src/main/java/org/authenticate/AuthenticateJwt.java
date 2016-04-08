package org.authenticate;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import org.restexpress.Request;
import org.apache.commons.lang3.exception.ExceptionUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class AuthenticateJwt {

    private static final Logger LOG = LoggerFactory.getLogger(AuthenticateJwt.class);

    public static boolean authenticateJwt(Request request, String baseUrl, int authport) {
        String jwt, output, valid = "";

        try {
            LOG.info("Request from the following URL: {}", request.getUrl());
            jwt = (request.getHeader("Authorization").split(" "))[1];
        } catch (NullPointerException | ArrayIndexOutOfBoundsException e) {
            LOG.error("Cannot obtain the header, 'Authorization'. Failed: {}",
                    ExceptionUtils.getRootCauseMessage(e));
            LOG.debug("Cannot obtain the header, 'Authorization'. Failed (#authenticateJwt()): {}",
                    ExceptionUtils.getStackTrace(e));
            return false;
        }

        try {
            URL url = new URL("http://" + baseUrl + ":" + authport + "/jwts/" + jwt);
            LOG.info("The authentication service URL called: {}", url);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Accept", "application/json");

            if (conn.getResponseCode() != 200) {
                LOG.error("{}:{}", new Object[]{conn.getResponseCode(),
                    conn.getResponseMessage()});
                return false;
            }

            BufferedReader br = new BufferedReader(new InputStreamReader(
                    (conn.getInputStream())));

            while ((output = br.readLine()) != null) {
                valid = output;
            }

            conn.disconnect();
        } catch (MalformedURLException e) {
            LOG.error("Failed:", ExceptionUtils.getRootCauseMessage(e));
            LOG.debug("#authenticateJwt() failed:", ExceptionUtils.getStackTrace(e));
            return false;
        } catch (IOException e) {
            LOG.error("Failed:", ExceptionUtils.getRootCauseMessage(e));
            LOG.debug("#authenticateJwt() failed:", ExceptionUtils.getStackTrace(e));
            return false;
        }
        return Boolean.parseBoolean(valid);
    }
}
