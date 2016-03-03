package javaee;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;

@Path("sayhello")
public class HelloController {
    
    @GET
    @Path("hello")
    public String helloAction(@QueryParam("name") String name) {
        return "Hello " + name + "!";
    }
}
