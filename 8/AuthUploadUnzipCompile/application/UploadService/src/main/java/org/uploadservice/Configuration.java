package org.uploadservice;

import org.apache.commons.fileupload.disk.DiskFileItemFactory;

import java.io.File;
import java.util.Properties;
import org.apache.commons.fileupload.FileUpload;
import org.controller.UploadController;
import org.restexpress.RestExpress;
import org.restexpress.util.Environment;
import org.utilities.DeleteFilesOnEndUploadCleaningTracker;

public class Configuration
        extends Environment {

    private static final String DEFAULT_EXECUTOR_THREAD_POOL_SIZE = "20";
    private static final int DEFAULT_AUTH_PORT = 8587;

    private static final String DEFAULT_BASE_URL = "localhost";
    private static final String PORT_PROPERTY = "port";
    private static final String AUTH_PORT_PROPERTY = "auth.port";
    private static final String BASE_URL_PROPERTY = "base.url";
    private static final String EXECUTOR_THREAD_POOL_SIZE = "executor.threadPool.size";

    private int port;
    private int authport;
    private String baseUrl;
    private int executorThreadPoolSize;
    private static final int MAX_FILE_SIZE = 1024 * 1024 * 50; // 50MB

    private UploadController deliveryController;

    private FileUpload fileUpload = new FileUpload();
    private DeleteFilesOnEndUploadCleaningTracker fileCleaningTracker = new DeleteFilesOnEndUploadCleaningTracker();

    @Override
    protected void fillValues(Properties p) {
        this.port = Integer.parseInt(p.getProperty(PORT_PROPERTY, String.valueOf(RestExpress.DEFAULT_PORT)));
        this.authport = Integer.parseInt(p.getProperty(AUTH_PORT_PROPERTY, String.valueOf(DEFAULT_AUTH_PORT)));
        this.baseUrl = p.getProperty(BASE_URL_PROPERTY, DEFAULT_BASE_URL);
        this.executorThreadPoolSize = Integer.parseInt(p.getProperty(EXECUTOR_THREAD_POOL_SIZE, DEFAULT_EXECUTOR_THREAD_POOL_SIZE));

        DiskFileItemFactory diskFileItemFactory = new DiskFileItemFactory();
        diskFileItemFactory.setRepository(new File(System.getProperty("java.io.tmpdir")));
        diskFileItemFactory.setFileCleaningTracker(fileCleaningTracker);

        // sets maximum size of upload file
        fileUpload.setFileSizeMax(MAX_FILE_SIZE);

        this.fileUpload.setFileItemFactory(diskFileItemFactory);
        initialize();
    }

    private void initialize() {
        deliveryController = new UploadController(fileUpload, fileCleaningTracker, baseUrl, authport);
    }

    /**
     *
     * @return fileUpload
     */
    public FileUpload getFileUpload() {
        return fileUpload;
    }

    /**
     *
     * @return port
     */
    public int getPort() {
        return port;
    }

    /**
     *
     * @return baseUrl
     */
    public String getBaseUrl() {
        return baseUrl;
    }

    /**
     *
     * @return executorThreadPoolSize
     */
    public int getExecutorThreadPoolSize() {
        return executorThreadPoolSize;
    }

    /**
     *
     * @return deliveryController
     */
    public UploadController getUploadController() {
        return deliveryController;
    }
}
