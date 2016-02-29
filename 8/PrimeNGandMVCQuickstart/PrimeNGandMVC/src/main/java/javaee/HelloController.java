package javaee;

import java.util.logging.Logger;
import javax.inject.Inject;
import javax.mvc.Models;
import javax.mvc.annotation.Controller;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;

@Controller
@Path("sayhello")
public class HelloController {

    @Inject
    private Models models;

    @GET
    @Path("hello")
    public String helloAction(@QueryParam("name") String name) {
         models.put("name", name);
        return "/hello.jsp";
    }
}
