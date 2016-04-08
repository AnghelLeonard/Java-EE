package org.controller;

import io.netty.handler.codec.http.HttpResponseStatus;
import java.io.File;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import org.authenticate.AuthenticateJwt;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUpload;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.lang3.exception.ExceptionUtils;

import org.restexpress.Request;
import org.restexpress.Response;
import org.slf4j.LoggerFactory;
import org.utilities.DeleteFilesOnEndUploadCleaningTracker;
import org.utilities.MultiPartDecoder;
import org.utilities.RestUploadContext;

public class UploadController {

    private static final org.slf4j.Logger LOG = LoggerFactory.getLogger(AuthenticateJwt.class);
    private static final String SOURCES_PATH = System.getProperty("java.io.tmpdir") + File.separator + "sources";

    private final FileUpload fileUpload;
    private final String baseUrl;
    private final int authport;
    private final DeleteFilesOnEndUploadCleaningTracker tracker;

    public UploadController(FileUpload fileUpload, DeleteFilesOnEndUploadCleaningTracker tracker, String baseUrl, int authport) {
        super();
        this.fileUpload = fileUpload;
        this.baseUrl = baseUrl;
        this.tracker = tracker;
        this.authport = authport;
    }

    public Object create(Request request, Response response) {

        LOG.info("Request to upload a file ...");
        LOG.info("Must authenticate user first ...");

        // just for running the upload test we do not authenticate the user, '2533223341'
        // this feature should be removed, or a comprehensive unit test should be added
        String fake = request.getHeader("Authorization");

        if (!fake.equals("2533223341")) {
            // try to authenicate the user        
            if (AuthenticateJwt.authenticateJwt(request, baseUrl, authport) != true) {
                response.setResponseStatus(HttpResponseStatus.UNAUTHORIZED);

                LOG.info("Client cannot be authenticated");

                return null;
            }
            LOG.info("Client was successfully authenticated, proceed with upload");
        } else {
            LOG.info("Oooo ... you are the upload test ...");
        }

        RestUploadContext context = RestUploadContext.fromRequest(request);
        long timestamp = System.currentTimeMillis();

        try {
            // create a folder in temporary, named 'sources'
            File sources = new File(SOURCES_PATH);
            if (!sources.exists()) {
                boolean created_s = sources.mkdir();
                if (!created_s) {
                    LOG.error("Cannot create the 'sources' folder. This may be a permission issue.");
                    response.setResponseStatus(HttpResponseStatus.INTERNAL_SERVER_ERROR);
                    tracker.deleteTemporaryFiles();
                    return null;
                }
            }

            // create a timestamp folder for this upload           
            String folderToUpload = SOURCES_PATH + File.separator + timestamp;
            File tsfolder = new File(folderToUpload);
            boolean created_ts = tsfolder.mkdir();
            if (!created_ts) {
                LOG.error("Cannot create the upload folder (timestamp). This may be a permission issue.");
                response.setResponseStatus(HttpResponseStatus.INTERNAL_SERVER_ERROR);
                tracker.deleteTemporaryFiles();
                return null;
            }

            List<FileItem> items = fileUpload.parseRequest(context);
            Map<String, List<FileItem>> parts = MultiPartDecoder.getParts(items);

            if (!parts.isEmpty()) {
                // in current version we can upload a single part (a single ZIP in a request)
                // the rest of parts (if any) are ignored
                FileItem file = (FileItem) parts.entrySet().iterator().next().getValue().get(0);

                // File operation                
                File storeFile = new File(folderToUpload + File.separator + timestamp + ".zip");

                try {
                    // saves the file on disk
                    file.write(storeFile);

                    LOG.info("File successfully uploaded, {}", storeFile.getName());

                } catch (Exception e) {
                    LOG.error("Cannot upload (write on disk) the file:{}, {}",
                            new Object[]{storeFile.getAbsolutePath(), ExceptionUtils.getRootCauseMessage(e)});
                    LOG.debug("Cannot upload (write on disk) a (#create()): {}",
                            ExceptionUtils.getStackTrace(e));
                    tracker.deleteTemporaryFiles();
                    return "Cannot (write) upload the file: " + storeFile.getName();
                }
            } else {
                return "Only ZIP (application/zip) are allowed";
            }
        } catch (FileUploadException e) {
            LOG.error("File upload failed, {}", ExceptionUtils.getRootCauseMessage(e));
            LOG.debug("File upload failed {}", ExceptionUtils.getStackTrace(e));
            tracker.deleteTemporaryFiles();
            return "Sorry, cannot upload this file";
        }

        return timestamp;
    }

    public Object read(Request request, Response response) {
        //TODO: Your 'GET' logic here...
        return null;
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
