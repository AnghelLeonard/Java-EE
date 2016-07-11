package org.dao;

import java.util.List;
import org.entities.Products;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Anghel Leonard
 */
@Repository
public class ProductsDAOImpl extends GenericDAOImpl<Products, Long> implements ProductsDAO {

    protected ProductsDAOImpl() {
        super(Products.class);
    }

    @Override
    public List<Products> getProducts() {
        return getEntityManager().createQuery("SELECT p FROM Products p").getResultList();
    }

}
