package org.authentication;

import org.controller.ClientController;
import org.objectid.ClientRepository;
import org.objectid.ClientService;

import java.util.Properties;
import org.restexpress.RestExpress;
import org.restexpress.util.Environment;
import com.strategicgains.repoexpress.mongodb.MongoConfig;
import com.strategicgains.restexpress.plugin.metrics.MetricsConfig;
import org.controller.JwtController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Configuration
        extends Environment {
    
    private static final Logger LOG = LoggerFactory.getLogger(Configuration.class);

    private static final String DEFAULT_BASE_URL = "localhost";
    private static final String DEFAULT_SERVICE_NAME = "authentication-service";
    private static final String DEFAULT_EXECUTOR_THREAD_POOL_SIZE = "20";

    private static final String DEFAULT_JWT_EXPIRE_LENGTH = "36000"; // 10 hours
    private static final String DEFAULT_JWT_ISSUER = "My-Java-Compiler";

    private static final String PORT_PROPERTY = "port";
    private static final String BASE_URL_PROPERTY = "base.url";
    private static final String SERVICE_NAME = "service.name";
    private static final String EXECUTOR_THREAD_POOL_SIZE = "executor.threadPool.size";

    private static final String JWT_EXPIRE_LENGTH = "jwt.expire.length";
    private static final String JWT_ISSUER = "jwt.issuer";

    private int port;
    private String baseUrl;
    private String serviceName;
    private int jwtExpireLength;
    private String jwtIssuer;
    private int executorThreadPoolSize;
    private MetricsConfig metricsSettings;
    private ClientController clientController;
    private JwtController jwtController;   

    /**
     *
     * @param p
     */
    @Override
    protected void fillValues(Properties p) {
        this.port = Integer.parseInt(p.getProperty(PORT_PROPERTY,
                String.valueOf(RestExpress.DEFAULT_PORT)));
        this.baseUrl = p.getProperty(BASE_URL_PROPERTY, DEFAULT_BASE_URL);        
        this.jwtExpireLength = Integer.parseInt(p.getProperty(
                JWT_EXPIRE_LENGTH, DEFAULT_JWT_EXPIRE_LENGTH));
        this.jwtIssuer = p.getProperty(
                JWT_ISSUER, DEFAULT_JWT_ISSUER);
        
        this.serviceName = p.getProperty(SERVICE_NAME, DEFAULT_SERVICE_NAME);
        this.executorThreadPoolSize = Integer.parseInt(p.getProperty(
                EXECUTOR_THREAD_POOL_SIZE, DEFAULT_EXECUTOR_THREAD_POOL_SIZE));
        this.metricsSettings = new MetricsConfig(p);
        MongoConfig mongo = new MongoConfig(p);
        initialize(mongo);
    }

    private void initialize(MongoConfig mongo) {
        
        LOG.info("Initialize client repository for MongoDB ...");
        
        ClientRepository clientRepository = new ClientRepository(
                mongo.getClient(), mongo.getDbName());
        ClientService clientService = new ClientService(clientRepository);
        clientController = new ClientController(clientService);
        jwtController = new JwtController(baseUrl, port, jwtExpireLength, jwtIssuer);        
    }

    /**
     *
     * @return port
     */
    public int getPort() {
        return port;
    }

    /**
     *
     * @return baseUrl
     */
    public String getBaseUrl() {
        return baseUrl;
    }

    /**
     * @return jwtExpireLength
     */
    public int getJwtExpireLength() {
        return jwtExpireLength;
    }

    /**
     * @return jwtIssuer
     */
    public String getJwtIssuer() {
        return jwtIssuer;
    }

    /**
     *
     * @return executorThreadPoolSize
     */
    public int getExecutorThreadPoolSize() {
        return executorThreadPoolSize;
    }

    /**
     *
     * @return metricsSettings
     */
    public MetricsConfig getMetricsConfig() {
        return metricsSettings;
    }

    /**
     *
     * @return clientController
     */
    public ClientController getClientController() {
        return clientController;
    }

    /**
     *
     * @return jwtController
     */
    public JwtController getJwtController() {
        return jwtController;
    }    

    /**
     * @return serviceName
     */
    public String getServiceName() {
        return serviceName;
    }
}
