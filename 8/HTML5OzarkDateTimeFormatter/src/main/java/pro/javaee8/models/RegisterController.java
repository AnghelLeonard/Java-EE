package pro.javaee8.models;

import java.util.List;
import javax.inject.Inject;
import javax.mvc.Models;
import javax.mvc.annotation.Controller;
import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;

@Controller
@Path("register")
public class RegisterController {

    @Inject
    private Models models;

    @POST
    public Response register(@FormParam("email") String email, @FormParam("birthdate") DateParam birthdate, 
            @FormParam("birthtime") TimeParam birthtime) {

        final Register register = new Register();

        register.setEmail(email);
        if ((birthdate != null) && (birthtime != null)) {
            register.setBirthdate(birthdate.getDate());
            register.setBirthtime(birthtime.getTime());
        }        

        models.put("register", register);

        return Response.status(Response.Status.OK).entity("confirm.jsp").build();
    }
}
