package ee7.jaxrs;

import javax.ws.rs.CookieParam;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.Path;

/**
 *
 * @author Anghel Leonard
 */
@Path("hello")
public class HelloResource {

    @GET
    @Produces("text/plain") // default: */*
    public String helloWorld(@CookieParam(value="hellofrom") String from) {
        return "Hello, " + from+"!";
    }
}
