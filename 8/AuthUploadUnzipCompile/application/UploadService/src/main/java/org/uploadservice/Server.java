package org.uploadservice;

import com.strategicgains.restexpress.plugin.cors.CorsHeaderPlugin;
import org.restexpress.pipeline.SimpleConsoleLogMessageObserver;
import org.restexpress.RestExpress;
import org.serialization.SerializationProvider;

public class Server {

    private static final String SERVICE_NAME = "UploadService";

    private final RestExpress server;
    private final Configuration config;
    private boolean isStarted = false;

    public Server(Configuration config) {
        this.config = config;
        RestExpress.setSerializationProvider(new SerializationProvider());

        this.server = new RestExpress()
                .setName(SERVICE_NAME)
                .setBaseUrl(config.getBaseUrl())
                .setMaxContentSize(1024 * 1024 * 50) // max 50 MB of upload             
                .setExecutorThreadCount(config.getExecutorThreadPoolSize())
                .addMessageObserver(new SimpleConsoleLogMessageObserver())
                .registerPlugin(new CorsHeaderPlugin("*")); 

        Routes.define(config, server);
    }

    public Server start() {
        if (!isStarted) {
            server.bind(config.getPort());
            isStarted = true;
        }

        return this;
    }

    public void awaitShutdown() {
        if (isStarted) {
            server.awaitShutdown();
        }
    }

    public void shutdown() {
        if (isStarted) {
            server.shutdown();
        }
    }
}
