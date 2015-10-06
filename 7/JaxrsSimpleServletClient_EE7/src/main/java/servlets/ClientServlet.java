package servlets;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.Invocation;
import javax.ws.rs.client.WebTarget;
import javax.ws.rs.core.Response;

/**
 *
 * @author Anghel Leonard
 */
@WebServlet(urlPatterns={"/ClientServlet"}, asyncSupported=true)
public class ClientServlet extends HttpServlet {

    // for simple demo, URL is hard-coded
    private final String jaxrsResource = "http://localhost:8080/JaxrsSimpleServletClient_EE7/webresources/helloworld/";

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        // get the instance of client which will be entry point to invoking services
        Client jaxrsClient = ClientBuilder.newClient();

        // targeting the JAX-RS serivce we want to invoke by capturing it in WebTarget instance
        WebTarget webTarget = jaxrsClient.target(jaxrsResource);

        // build the request (e.g. a GET request)
        Invocation invocation = webTarget.request("text/plain").buildGet();

        // invoke the request
        Response jaxrsResponse = invocation.invoke();

        // respond to client
        String hello = jaxrsResponse.readEntity(String.class);

        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        out.println("<h3>" + hello + "</h3>");
    }

    @Override
    public String getServletInfo() {
        return "Client Server";
    }

}
