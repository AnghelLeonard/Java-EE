package com.sample.boundary;

import com.sample.model.Product;
import java.util.Random;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("product")
@Stateless
public class ProductResource {

    @PersistenceContext(unitName = "PU")
    private EntityManager em;

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.TEXT_PLAIN)
    public long addProduct(Product product) {
        
        product.setSku(new Random().nextInt(100));
        em.persist(product);
        
        return product.getId();
    }

    @GET
    @Path("{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public Product loadProduct(@PathParam("id") long id) {
        
        return em.find(Product.class, id);              
    }
}
