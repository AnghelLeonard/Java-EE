package org.utilities;

import java.io.BufferedInputStream;
import java.io.DataInputStream;
import java.io.IOException;
import org.apache.commons.fileupload.FileItem;

import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import org.apache.commons.lang3.exception.ExceptionUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public final class MultiPartDecoder {

    private static final Logger LOG = LoggerFactory.getLogger(MultiPartDecoder.class);

    private MultiPartDecoder() {
        throw new AssertionError();
    }

    public static Map<String, List<FileItem>> getParts(List<FileItem> request) {

        Map<String, List<FileItem>> parts = new LinkedHashMap<>();

        request.stream().forEach((FileItem it) -> {
            final String partName = it.getFieldName();
            
            boolean isZip = false;

            // in order to reject files that are not ZIP we will not check the content-type 
            // String ct = it.getContentType(); as application/zip, application/x-zip,
            // application/x-zip-compressed or file extension because sometimes ZIP files report content type 
            // as application/octet-stream so we perform standard "magic number" check

            try (
                DataInputStream in = new DataInputStream(new BufferedInputStream(it.getInputStream()))) {
                int test = in.readInt();
                isZip = test == 0x504b0304;
            } catch (IOException e) {
               LOG.error("Some currputed file found (most probably not a ZIP file) ... {}", 
                       ExceptionUtils.getRootCauseMessage(e));
            }                        

            if (isZip) {                
                if (parts.containsKey(partName)) {
                    parts.get(partName).add(it);
                } else {
                    List<FileItem> items = new LinkedList<>();
                    items.add(it);
                    parts.put(partName, items);
                }
                
                LOG.info("File added for upload ...{}", it);                
            } else {
                LOG.info("File rejected because the content-type doesn't point to a ZIP archive ... {}", it);
            }
        });

        return parts;
    }
}
