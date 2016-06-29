package org.controller;

import java.util.List;

import io.netty.handler.codec.http.HttpMethod;

import org.restexpress.Request;
import org.restexpress.Response;
import org.restexpress.common.query.QueryFilter;
import org.restexpress.common.query.QueryOrder;
import org.restexpress.common.query.QueryRange;
import org.restexpress.query.QueryFilters;
import org.restexpress.query.QueryOrders;
import org.restexpress.query.QueryRanges;
import org.authentication.Constants;

import com.strategicgains.hyperexpress.HyperExpress;
import com.strategicgains.hyperexpress.builder.TokenResolver;
import com.strategicgains.hyperexpress.builder.UrlBuilder;
import com.strategicgains.repoexpress.mongodb.Identifiers;
import io.netty.handler.codec.http.HttpResponseStatus;

import org.apache.commons.lang.RandomStringUtils;
import org.objectid.Client;
import org.objectid.ClientService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * This is the 'controller' layer, where HTTP details are converted to domain
 * concepts and passed to the service layer. Then service layer response
 * information is enhanced with HTTP details, if applicable, for the response.
 */
public class ClientController {

    private static final Logger LOG = LoggerFactory.getLogger(ClientController.class);

    private static final UrlBuilder LOCATION_BUILDER = new UrlBuilder();
    private final ClientService service;

    /**
     *
     * @param clientService
     */
    public ClientController(ClientService clientService) {
        super();
        this.service = clientService;
    }

    /**
     *
     * @param request
     * @param response
     * @return Client
     */
    public Client create(Request request, Response response) {

        LOG.info("Request to create a new client ...");
        
        Client entity = request.getBodyAs(Client.class,
                "Resource details not provided");                

        String api_key = RandomStringUtils.randomAlphanumeric(24);
        entity.setApiKey(api_key);
        Client saved = service.create(entity);

        // Construct the response for create...
        response.setResponseCreated();

        // Bind the resource with link URL tokens, etc. here...
        TokenResolver resolver = HyperExpress.bind(Constants.Url.CLIENT_ID,
                Identifiers.MONGOID.format(saved.getId()));

        // Include the Location header...
        String locationPattern = request.getNamedUrl(HttpMethod.GET,
                Constants.Routes.SINGLE_CLIENT);
        response.addLocationHeader(LOCATION_BUILDER.build(locationPattern,
                resolver));

        LOG.info("Client successfully created: {}", Identifiers.MONGOID.format(saved.getId()));

        // Return the newly-created resource...
        return saved;
    }

    /**
     *
     * @param request
     * @param response
     * @return Client
     */
    public Client read(Request request, Response response) {
        
        LOG.info("Request to read a client ...");

        String id = request.getHeader(Constants.Url.CLIENT_ID,
                "No resource ID supplied");
        Client entity = service.read(Identifiers.MONGOID.parse(id));

        // enrich the resource with links, etc. here...
        HyperExpress.bind(Constants.Url.CLIENT_ID, Identifiers.MONGOID.format(
                entity.getId()));                

        LOG.info("Client successfully read ...");
        
        // no need to log this action
        return entity;
    }

    /**
     *
     * @param request
     * @param response
     * @return List of Client
     */
    public List<Client> readAll(Request request, Response response) {
        
        LOG.info("Request to read all clients ...");

        QueryFilter filter = QueryFilters.parseFrom(request);
        QueryOrder order = QueryOrders.parseFrom(request);
        QueryRange range = QueryRanges.parseFrom(request, 20);
        boolean countOnly = Boolean.parseBoolean(
                request.getQueryStringMap().getOrDefault("countOnly", "false"));
        List<Client> entities = service.readAll(filter, range, order);
        long count = service.count(filter);

        response.setCollectionResponse(range, entities.size(), count);

        // Bind the resources in the collection with link URL tokens, etc. here...
        HyperExpress.tokenBinder((Client entity, TokenResolver resolver) -> {
            resolver.bind(Constants.Url.CLIENT_ID,
                    Identifiers.MONGOID.format(entity.getId()));
        });

        if (countOnly) { // only return count in Content-Range header
            entities.clear();
            return entities;
        }

        LOG.info("All clients successfully read ...");
        
        // no need to log this action
        return entities;
    }

    /**
     *
     * @param request
     * @param response
     * @return Client
     */
    public Client update(Request request, Response response) {
        
        LOG.info("Request to update a client ...");

        String id = request.getHeader(Constants.Url.CLIENT_ID,
                "No resource ID supplied");
        Client entity = request.getBodyAs(Client.class,
                "Resource details not provided");
        entity.setId(Identifiers.MONGOID.parse(id));
        service.update(entity);

        entity = service.read(Identifiers.MONGOID.parse(id));
        response.setResponseStatus(HttpResponseStatus.CREATED);

        // enrich the resource with links, etc. here...
        HyperExpress.bind(Constants.Url.CLIENT_ID, Identifiers.MONGOID.format(entity.getId()));

        LOG.info("Client successfully updated: {}", Identifiers.MONGOID.format(entity.getId()));

        return entity;

        // original response returned nothing
        //response.setResponseNoContent();
    }

    /**
     *
     * @param request
     * @param response
     */
    public void delete(Request request, Response response) {
        
        LOG.info("Request to delete a client ...");

        String id = request.getHeader(Constants.Url.CLIENT_ID,
                "No resource ID supplied");
        service.delete(Identifiers.MONGOID.parse(id));

        LOG.info("Client successfully deleted: {}", Identifiers.MONGOID.parse(id));

        response.setResponseNoContent();               
    }

    /**
     *
     * @param request
     * @param response
     * @return String
     */
    public String findClientSecret(Request request, Response response) {

        List<Client> entities = readAll(request, response);
        return entities.get(0).getSecret();
    }
}
