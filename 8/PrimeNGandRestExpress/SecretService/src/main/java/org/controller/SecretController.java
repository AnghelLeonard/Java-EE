package org.controller;

import io.netty.handler.codec.http.HttpResponseStatus;
import java.util.Collections;
import java.util.List;
import org.authenticate.AuthenticateJwt;

import org.restexpress.Request;
import org.restexpress.Response;
import org.secretservice.Constants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class SecretController {

    private static final Logger LOG = LoggerFactory.getLogger(SecretController.class);
    
    private final String baseUrl;
    private final int authport;

    public SecretController(String baseUrl, int authport) {
        super();
        this.baseUrl = baseUrl;
        this.authport = authport;
    }

    public Object create(Request request, Response response) {
        //TODO: Your 'POST' logic here...
        return null;
    }

    public Object read(Request request, Response response) {

        LOG.info("Request to a service that requires authentication ...");
        LOG.info("Must authenticate user first ...");

        // try to authenicate the user
        if (AuthenticateJwt.authenticateJwt(request, baseUrl, authport) != true) {
            response.setResponseStatus(HttpResponseStatus.UNAUTHORIZED);

            LOG.info("Client cannot be authenticated");

            return null;
        }
       
        String secret = request.getHeader(Constants.Url.SECRET_ID);
        
        return "Service was successfully accessed ... the secret id is: " + secret;
    }

    public List<Object> readAll(Request request, Response response) {
        //TODO: Your 'GET collection' logic here...
        return Collections.emptyList();
    }

    public void update(Request request, Response response) {
        //TODO: Your 'PUT' logic here...
        response.setResponseNoContent();
    }

    public void delete(Request request, Response response) {
        //TODO: Your 'DELETE' logic here...
        response.setResponseNoContent();
    }

    // allow CROS - in production it is not recommended to use "*"
    public void options(Request request, Response response) {
        //TODO: Your 'OPTIONS' logic here
        response.addHeader("Access-Control-Allow-Origin", "*");
        response.addHeader("Access-Control-Allow-Headers", "Origin, Authorization, Content-Type, Accept");
        response.addHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    }
}
