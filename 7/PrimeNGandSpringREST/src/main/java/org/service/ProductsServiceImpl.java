package org.service;

import java.util.List;
import org.dao.ProductsDAO;
import org.entities.Products;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Anghel Leonard
 */
@Repository
public class ProductsServiceImpl implements ProductsService {

    @Autowired
    private ProductsDAO productsDAO;

    @Override
    @Transactional
    public List<Products> getAllProducts() {

        return productsDAO.getProducts();
    }
}
