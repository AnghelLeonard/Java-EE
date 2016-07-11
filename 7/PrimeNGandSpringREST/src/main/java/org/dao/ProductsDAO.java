package org.dao;

import java.util.List;
import org.entities.Products;

/**
 *
 * @author Anghel Leonard
 */
public interface ProductsDAO extends GenericDAO<Products, Long> {

    List<Products> getProducts();
}
