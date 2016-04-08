package org.tests;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.file.Paths;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.apache.http.HttpEntity;
import org.apache.http.HttpStatus;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.mime.HttpMultipartMode;
import org.apache.http.entity.mime.MultipartEntityBuilder;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import static org.hamcrest.CoreMatchers.equalTo;
import org.junit.After;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;
import org.junit.Before;
import org.junit.Test;

public class UploadTest {

    private static final Logger LOGGER = Logger.getLogger(UploadTest.class.getName());

    private static final String SERVER = "http://localhost:8081/upload.json";
    private static final String ZIP_FILE_NAME = "SimpleApp.zip";
    private CloseableHttpClient client;
    private CloseableHttpResponse response;
    private HttpPost post;

    public UploadTest() {
        // NOPE
    }

    @Before
    public final void before() {
        client = HttpClientBuilder.create().build();
        post = new HttpPost(SERVER);
    }

    @After
    public final void after() throws IllegalStateException, IOException {
        post.completed();
        try {
            client.close();
        } catch (final IOException e1) {
            LOGGER.log(Level.SEVERE, e1.getMessage(), e1);
            throw e1;
        }

        if (response != null) {
            response.close();
        }
    }

    @Test
    public void testUpload() {
        try {
            try (InputStream inputStream = new FileInputStream(Paths.get("")
                    .toAbsolutePath().toString() + File.separator + ZIP_FILE_NAME)) {

                final MultipartEntityBuilder builder = MultipartEntityBuilder.create();
                builder.setMode(HttpMultipartMode.BROWSER_COMPATIBLE);
                builder.addBinaryBody("upstream", inputStream, ContentType
                        .create("application/zip"), ZIP_FILE_NAME);             

                final HttpEntity entity = builder.build();
                post.setEntity(entity);
                
                // we send a "fake" authorization
                // this was hard-coded and the upload service knows about it
                // is just a dummy way to avoid authentication and test the upload
                post.addHeader("Authorization", "2533223341");
                
                response = client.execute(post);
                final int statusCode = response.getStatusLine().getStatusCode();
                final String responseString = getContent();
                final String contentTypeInHeader = getContentTypeHeader();

                LOGGER.log(Level.INFO, "Status code: {0}", statusCode);
                LOGGER.log(Level.INFO, "Response string: {0}", responseString);
                LOGGER.log(Level.INFO, "POST Content Type: {0}", contentTypeInHeader);

                assertThat(statusCode, equalTo(HttpStatus.SC_OK));                
                assertTrue(contentTypeInHeader.contains("Content-Type: multipart/form-data;"));
            }
        } catch (IOException ex) {
            LOGGER.log(Level.SEVERE, null, ex);
        }
    }

    final String getContent() throws IOException {
        String content;
        String body;
        try (BufferedReader rd = new BufferedReader(
                new InputStreamReader(response.getEntity().getContent()))) {
            content = "";
            while ((body = rd.readLine()) != null) {
                content += body + "\n";
            }
        }
        return content.trim();
    }

    final String getContentTypeHeader() throws IOException {
        return post.getEntity().getContentType().toString();
    }
}
