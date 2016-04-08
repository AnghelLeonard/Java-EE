package org.controller;

import io.netty.handler.codec.http.HttpResponseStatus;
import java.io.File;
import java.io.IOException;
import java.util.Collections;
import java.util.List;
import org.apache.commons.lang3.exception.ExceptionUtils;
import org.authenticate.AuthenticateJwt;
import org.utilities.UnZip;
import org.restexpress.Request;
import org.restexpress.Response;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.unzipservice.Constants;

public class UnzipController {

    private static final Logger LOG = LoggerFactory.getLogger(UnzipController.class);

    private static final String SOURCES_PATH = System.getProperty("java.io.tmpdir") + File.separator + "sources";
    private final String baseUrl;
    private final int authport;

    public UnzipController(String baseUrl, int authport) {
        super();
        this.baseUrl = baseUrl;
        this.authport = authport;
    }

    public Object create(Request request, Response response) {
        //TODO: Your 'POST' logic here...        
        return null;
    }

    public Object read(Request request, Response response) {
        LOG.info("Request to unzip a file ...");
        LOG.info("Must authenticate user first ...");

        // try to authenicate the user
        if (AuthenticateJwt.authenticateJwt(request, baseUrl, authport) != true) {
            response.setResponseStatus(HttpResponseStatus.UNAUTHORIZED);

            LOG.info("Client cannot be authenticated");

            return null;
        }

        // unzip the archive from the corresponding folder
        String location = request.getHeader(Constants.Url.FILE_ID);

        LOG.info("Request to unzip the file located at {}", location);

        if (location != null) {
            UnZip unzip = new UnZip();
            try {
                unzip.unzipArchive(new File(SOURCES_PATH + File.separator
                        + location + File.separator + location + ".zip"),
                        new File(SOURCES_PATH + File.separator + location));
                
                LOG.info("Unzip request successfully ended ...");
                
            } catch (IOException e) {
                LOG.error("Cannot unzip the file:{},{}",
                        new Object[]{SOURCES_PATH + File.separator
                            + location + File.separator + location + ".zip",
                            ExceptionUtils.getRootCauseMessage(e)});
                LOG.debug("Unzip failed (#read()): {}", ExceptionUtils.getStackTrace(e));
                return "Cannot unzip (maybe this is a corrputed/missing archive)";
            }
        } else {
            LOG.info("Trying to unzip a file, but no location provided");
            return "No folder location supplied";
        }

        return location;
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
