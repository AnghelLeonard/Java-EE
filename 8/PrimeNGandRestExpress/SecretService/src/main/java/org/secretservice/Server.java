package org.secretservice;

import com.strategicgains.restexpress.plugin.cors.CorsHeaderPlugin;
import org.restexpress.RestExpress;
import org.restexpress.pipeline.SimpleConsoleLogMessageObserver;
import org.serialization.SerializationProvider;

public class Server {

    private static final String SERVICE_NAME = "Secret service";

    private final RestExpress server;
    private final Configuration config;
    private boolean isStarted = false;

    public Server(Configuration config) {
        this.config = config;
        RestExpress.setDefaultSerializationProvider(new SerializationProvider());

        this.server = new RestExpress()
                .setName(SERVICE_NAME)
                .setBaseUrl(config.getBaseUrl())
                .setExecutorThreadCount(config.getExecutorThreadPoolSize())
                .addMessageObserver(new SimpleConsoleLogMessageObserver())
                .registerPlugin(new CorsHeaderPlugin("*")); // enable all CROS (not recommended to use "*")

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
