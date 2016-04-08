package org.tests;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.logging.Logger;
import org.json.JSONObject;
import static org.junit.Assert.assertEquals;
import org.junit.BeforeClass;
import org.junit.Test;

public class TestAuthenticationService {

    private static final Logger LOG = Logger.getLogger(TestAuthenticationService.class.getName());        

    public TestAuthenticationService() {
    }

    @BeforeClass
    public static void setUpClass() {
        // we may need to ping the service here
    }

    @Test
    public void testAuthenticationService() {

        String responseBody = "";
        String output;
        Boolean expResult = true;
        String result;

        try {
            URL url = new URL(getBaseUrlAndPort());
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");

            JSONObject raw = new JSONObject();
            raw.put("application", "leonard");
            raw.put("secret", "java797b");
            
            conn.setDoInput(true);
            conn.setDoOutput(true);

            OutputStreamWriter wr = new OutputStreamWriter(conn.getOutputStream());
            wr.write(raw.toString());
            wr.flush();

            if (conn.getResponseCode() != 201) {
                // if not 201 response code then fail test
                result = "";
            }
            BufferedReader br = new BufferedReader(new InputStreamReader(
                    (conn.getInputStream())));
            while ((output = br.readLine()) != null) {
                responseBody = output;
            }
            if (responseBody.length() < 1) {
                // if response body is empty then fail test
                result = "";
            } else {
                result = responseBody;
            }

            conn.disconnect();
        } catch (IOException e) {            
            // if MalformedURLException, ConnectException, etc. then fail test
            LOG.severe(e.getMessage());
            result = "";
        }
        assertEquals(expResult, result.contains("apiKey"));
    }

    private String getBaseUrlAndPort() {
        return "http://localhost:8587/clients.json";
    }
}
