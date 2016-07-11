package org.service;

import java.util.List;
import org.entities.Products;
import org.springframework.stereotype.Service;

/**
 *
 * @author Anghel Leonard
 */
@Service
public interface ProductsService {
    
    List<Products> getAllProducts();    
}
