package org.authentication;

import java.util.Map;

import org.restexpress.RestExpress;
import org.objectid.Client;

import com.strategicgains.hyperexpress.HyperExpress;
import com.strategicgains.hyperexpress.RelTypes;

public abstract class Relationships {

    /**
     * Linking resource which aids HATEOAS
     * @param server
     */
    public static void define(RestExpress server) {
        Map<String, String> routes = server.getRouteUrlsByName();

        HyperExpress.relationships()
                .forClass(Client.class)
                .forCollectionOf(Client.class)
                .rel(RelTypes.SELF, routes.get(Constants.Routes.CLIENT_COLLECTION))
                .withQuery("limit={limit}")
                .withQuery("offset={offset}")
                .rel(RelTypes.NEXT, routes.get(Constants.Routes.CLIENT_COLLECTION)
                        + "?offset={nextOffset}")
                .withQuery("limit={limit}")
                .optional()
                .rel(RelTypes.PREV, routes.get(Constants.Routes.CLIENT_COLLECTION)
                        + "?offset={prevOffset}")
                .withQuery("limit={limit}")
                .optional()
                .forClass(Client.class)
                .rel(RelTypes.SELF, routes.get(Constants.Routes.SINGLE_CLIENT))
                .rel(RelTypes.UP, routes.get(Constants.Routes.CLIENT_COLLECTION));
    }
}
