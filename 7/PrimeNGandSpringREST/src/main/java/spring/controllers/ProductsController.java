package spring.controllers;

import java.util.List;
import org.entities.Products;
import org.service.ProductsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

/**
 *
 * @author Anghel Leonard
 */
@RestController
@EnableWebMvc
public class ProductsController {

    @Autowired
    private ProductsService productsService;

    @RequestMapping(value = "/products", method = RequestMethod.GET, produces = "application/json")
    public ResponseEntity<List<Products>> getAllProductsAction() {

        List<Products> products = productsService.getAllProducts();

        System.out.println("Products: " + products);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }
}
