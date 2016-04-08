package org.authentication;

public class Constants {

    /**
     * These define the URL parameters used in the route definition strings
     * (e.g. '{userId}').
     */
    public class Url {

        /**
         * CLIENT_ID
         */
        public static final String CLIENT_ID = "oid";

        /**
         * API_KEY
         */
        public static final String API_KEY = "apiKey";

        /**
         * SECRET
         */
        public static final String SECRET = "secret";

        /**
         * JWT
         */
        public static final String JWT = "jwt";
    }

    /**
     * These define the route names used in naming each route definitions. These
     * names are used to retrieve URL patterns within the controllers by name to
     * create links in responses.
     */
    public class Routes {

        /**
         * SINGLE_CLIENT
         */
        public static final String SINGLE_CLIENT = "client.single.route";

        /**
         * CLIENT_COLLECTION
         */
        public static final String CLIENT_COLLECTION = "client.collection.route";
    }
}
