package org.compileservice;

import io.netty.handler.codec.http.HttpResponseStatus;
import java.io.File;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import org.authenticate.AuthenticateJwt;
import org.utilities.FindPOMFile;
import org.utilities.JavaMainCompiler;
import org.utilities.MavenCompiler;

import org.restexpress.Request;
import org.restexpress.Response;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class CompileController {

    private static final Logger LOG = LoggerFactory.getLogger(CompileController.class);

    private static final String SOURCES_PATH = System.getProperty("java.io.tmpdir") + File.separator + "sources";

    private final String baseUrl;
    private final int authport;

    public CompileController(String baseUrl, int authport) {
        super();
        this.baseUrl = baseUrl;
        this.authport = authport;
    }

    public Object create(Request request, Response response) {
        //TODO: Your 'POST' logic here...
        return null;
    }

    public Object read(Request request, Response response) {

        LOG.info("Request to compile a file ...");
        LOG.info("Must authenticate user first ...");

        // try to authenicate the user
        if (AuthenticateJwt.authenticateJwt(request, baseUrl, authport) != true) {
            response.setResponseStatus(HttpResponseStatus.UNAUTHORIZED);

            LOG.info("Client cannot be authenticated");

            return null;
        }

        List<String> output = new ArrayList<>();
        String location = request.getHeader(Constants.Url.FILE_ID);
        String path = SOURCES_PATH + File.separator + location;

        LOG.info("Request to compile the file located at {}", location);

        if (location != null) {

            LOG.info("Determining the application type (Maven or not) ...");

            // checking if this is a Maven project
            // trying to locate the first pom.xml in the project
            FindPOMFile fpf = new FindPOMFile(new File(path));
            String pomPath = fpf.findPOM();

            if (pomPath != null) {
                // compile via Maven

                LOG.info("Compile the Maven project via pom.xml, {}" + pomPath);

                MavenCompiler mavenCompiler = new MavenCompiler(pomPath);
                output = mavenCompiler.compile();
            } else {
                // compile via javac

                LOG.info("Compile the project via javac, {}", path);

                JavaMainCompiler compiler = new JavaMainCompiler(new File(path), new File(path));
                output = compiler.compile();
            }
        }

        return output;
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
