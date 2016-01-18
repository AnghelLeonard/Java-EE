package primeelements.and.ozark;

import java.util.List;
import javax.inject.Inject;
import javax.mvc.Models;
import javax.mvc.annotation.Controller;
import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;

@Controller
@Path("register")
public class RegisterController {

    @Inject
    private Models models;

    @POST
    public String register(@FormParam("name") String name, @FormParam("security") String sn, 
            @FormParam("country") String country, @FormParam("card") String card, @FormParam("order") List<String> order) {

        final Register register = new Register();

        register.setName(name);
        register.setSecurity(sn);
        register.setCountry(country);
        register.setCard(card);
        register.setOrder(order);

        models.put("register", register);

        return "confirm.jsp";
    }
}
