package org.uploadservice;

import io.netty.handler.codec.http.HttpMethod;

import org.restexpress.RestExpress;

public abstract class Routes {

    public static void define(Configuration config, RestExpress server) {
        server.uri("/upload.{format}", config.getUploadController())
                .action("readAll", HttpMethod.GET).method(HttpMethod.OPTIONS).method(HttpMethod.POST)
                .name(Constants.Routes.SAMPLE_COLLECTION);                  
    }
}
