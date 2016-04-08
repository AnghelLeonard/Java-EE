package org.compileservice;

import io.netty.handler.codec.http.HttpMethod;

import org.restexpress.RestExpress;

public abstract class Routes {

    public static void define(Configuration config, RestExpress server) {        
        server.uri("/compile/{fileId}", config.getCompileController())
                .method(HttpMethod.GET).method(HttpMethod.OPTIONS).name(Constants.Routes.SINGLE_SAMPLE);
    }
}
