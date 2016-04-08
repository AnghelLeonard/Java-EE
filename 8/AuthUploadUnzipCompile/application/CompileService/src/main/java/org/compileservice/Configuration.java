package org.compileservice;

import java.util.Properties;

import org.restexpress.RestExpress;
import org.restexpress.util.Environment;

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

    private CompileController compileController;

    @Override
    protected void fillValues(Properties p) {
        this.port = Integer.parseInt(p.getProperty(PORT_PROPERTY, String.valueOf(RestExpress.DEFAULT_PORT)));
        this.authport = Integer.parseInt(p.getProperty(AUTH_PORT_PROPERTY, String.valueOf(DEFAULT_AUTH_PORT)));
        this.baseUrl = p.getProperty(BASE_URL_PROPERTY, DEFAULT_BASE_URL);
        this.executorThreadPoolSize = Integer.parseInt(p.getProperty(EXECUTOR_THREAD_POOL_SIZE, DEFAULT_EXECUTOR_THREAD_POOL_SIZE));
        initialize();
    }

    private void initialize() {
        compileController = new CompileController(baseUrl, authport);
    }

    public int getPort() {
        return port;
    }

    public String getBaseUrl() {
        return baseUrl;
    }

    public int getExecutorThreadPoolSize() {
        return executorThreadPoolSize;
    }

    public CompileController getCompileController() {
        return compileController;
    }
}
