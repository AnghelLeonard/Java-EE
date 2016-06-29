package org.objectid;

import com.mongodb.MongoClient;
import com.strategicgains.repoexpress.mongodb.MongodbEntityRepository;

public class ClientRepository
        extends MongodbEntityRepository<Client> {

    /**
     *
     * @param mongo
     * @param dbName
     */
    @SuppressWarnings("unchecked")
    public ClientRepository(MongoClient mongo, String dbName) {
        super(mongo, dbName, Client.class);
    }
}
