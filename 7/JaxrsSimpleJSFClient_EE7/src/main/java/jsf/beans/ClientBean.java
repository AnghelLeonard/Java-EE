package jsf.beans;

import java.io.Serializable;
import javax.faces.view.ViewScoped;
import javax.inject.Named;
import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.Invocation;
import javax.ws.rs.client.WebTarget;
import javax.ws.rs.core.Response;

/**
 *
 * @author Anghel Leonard
 */
@Named
@ViewScoped
public class ClientBean implements Serializable {

    private final Client jaxrsClient;
    // for simple demo, URL is hard-coded
    private final String jaxrsResource = "http://localhost:8080/JaxrsSimpleJSFClient_EE7/webresources/helloworld/";
    
    private String hello;

    public ClientBean() {
        // get the instance of client which will be entry point to invoking services
        jaxrsClient = ClientBuilder.newClient();
    }

    public void sayHelloWorldAction() {
        // targeting the JAX-RS serivce we want to invoke by capturing it in WebTarget instance
        WebTarget webTarget = jaxrsClient.target(jaxrsResource);

        // build the request (e.g. a GET request)
        Invocation invocation = webTarget.request("text/plain").buildGet();

        // invoke the request
        Response response = invocation.invoke();
        
        // set the response in the bean property
        this.hello = response.readEntity(String.class);
    }

    public String getHello() {
        return hello;
    }

    public void setHello(String hello) {
        this.hello = hello;
    }        
}
