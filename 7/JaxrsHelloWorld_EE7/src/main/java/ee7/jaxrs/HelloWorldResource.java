package ee7.jaxrs;

import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.Path;

/**
 *
 * @author Anghel Leonard
 */
@Path("helloworld")
public class HelloWorldResource {

    @GET
    @Produces("text/plain") // default: */*
    public String helloWorld() {
        return "Hello, World!";
    }
}
