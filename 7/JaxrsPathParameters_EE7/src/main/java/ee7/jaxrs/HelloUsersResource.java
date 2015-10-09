package ee7.jaxrs;

import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;

/**
 *
 * @author Anghel Leonard
 */
@Path("/users/{username: [a-zA-Z][a-zA-Z_0-9]*}")
public class HelloUsersResource {

    @GET
    @Path("/admin/{id: \\d+}")
    @Produces("text/plain")
    public String helloAdmin(@PathParam("username") String admin, @PathParam("id") String id) {
        return "Hello, " + admin + " (" + id + ")!";
    }

    @GET
    @Path("/user")
    @Produces("text/plain")
    public String helloUser(@PathParam("username") String user) {
        return "Hello, " + user + "!";
    }
}
