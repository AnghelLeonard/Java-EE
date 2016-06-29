package org.serialization;

import org.objectid.Client;
import org.restexpress.serialization.xml.XstreamXmlProcessor;

public class XmlSerializationProcessor
        extends XstreamXmlProcessor {

    public XmlSerializationProcessor() {
        super();
        alias("client", Client.class);
        registerConverter(new XstreamOidConverter());
    }
}
