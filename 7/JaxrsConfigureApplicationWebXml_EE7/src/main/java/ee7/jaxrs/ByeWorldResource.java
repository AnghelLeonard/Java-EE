package ee7.jaxrs;

import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.Path;

/**
 *
 * @author Anghel Leonard
 */
@Path("byeworld")
public class ByeWorldResource {

    @GET
    @Produces("text/plain") // default: */*
    public String byeWorld() {
        return "Bye, World!";
    }
}
