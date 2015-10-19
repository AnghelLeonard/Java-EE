package ee7.jaxrs;

import java.util.Arrays;
import javax.ws.rs.FormParam;
import javax.ws.rs.Produces;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;

/**
 *
 * @author Anghel Leonard
 */
@Path("user")
public class OrderResource {

    @POST
    @Path("/order")
    @Produces("text/html") // default: */*
    public Response orderAction(
            @FormParam("name") String name,
            @FormParam("security") int sn,
            @FormParam("country") String country,
            @FormParam("card") String card,
            @FormParam("order") String[] order) {

        return Response.status(200)
                .entity("<h1>Thank you :</h1>" + name
                        + "<br/>Your subscription overview: "
                        + "<h2>Security: </h2>" + sn
                        + "<h2>Country: </h2>" + country
                        + "<h2>card: </h2>" + card
                        + "<h2>Order: </h2>" + Arrays.toString(order))
                .build();
    }
}
