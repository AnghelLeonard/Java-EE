package sh.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import sh.model.Product;

/**
 *
 * @author Anghel Leonard
 */
@RepositoryRestResource(collectionResourceRel = "items", path = "items")
public interface ProductRepository extends JpaRepository<Product, Long> {

    // not used!
    Product findByName(@Param("name") String name);    
}
