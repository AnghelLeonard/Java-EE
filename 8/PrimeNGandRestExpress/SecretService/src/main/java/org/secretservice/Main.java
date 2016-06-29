package org.secretservice;

import org.restexpress.util.Environment;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Main {

    private static final Logger LOG = LoggerFactory.getLogger(Main.class);

    public static void main(String[] args) throws Exception {

        LOG.info("**************************");
        LOG.info("Initialize RestExpress (service SecretService) ...");
        LOG.info("**************************");

        Configuration config = Environment.load(args, Configuration.class);
        Server server = new Server(config);
        server.start().awaitShutdown();
    }
}
