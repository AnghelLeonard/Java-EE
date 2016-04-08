package org.utilities;

import java.io.IOException;
import java.io.InputStream;
import org.apache.commons.fileupload.UploadContext;
import org.jboss.netty.buffer.ChannelBuffer;
import org.jboss.netty.buffer.ChannelBufferInputStream;
import org.jboss.netty.buffer.ChannelBuffers;
import org.restexpress.Request;

@SuppressWarnings("deprecation")
public class RestUploadContext implements UploadContext {

    private final long contentLength;
    private final String characterEncoding;
    private final String contentType;
    private final InputStream inputStream;

    private RestUploadContext(long contentLength, String characterEncoding, String contentType, InputStream inputStream) {
        this.contentLength = contentLength;
        this.characterEncoding = characterEncoding;
        this.contentType = contentType;
        this.inputStream = inputStream;
    }

    public static RestUploadContext fromRequest(Request request) {
       
        ChannelBuffer response = ChannelBuffers.copiedBuffer(request.getBodyAsByteBuffer());             

        return new Builder()
                .withChannelBuffer(response)
                .withContentType(request.getHeader("Content-Type"))
                .withContentLength(Long.valueOf(request.getHeader("Content-length")))
                .build();
    }

    public static class Builder {

        private Long contentLength = 0L;
        private String characterEncoding = "UTF-8";
        private String contentType = "multipart/form-data";
        private InputStream inputStream;

        public Builder() {
        }

        public Builder withContentLength(long length) {
            this.contentLength = length;
            return this;
        }

        public Builder withCharacterEncoding(String encoding) {
            this.characterEncoding = encoding;
            return this;
        }

        public Builder withContentType(String contentType) {
            this.contentType = contentType;
            return this;
        }

        public Builder withChannelBuffer(ChannelBuffer channel) {
            this.inputStream = new ChannelBufferInputStream(channel);
            return this;
        }

        public RestUploadContext build() {
            return new RestUploadContext(contentLength, characterEncoding, contentType, inputStream);
        }
    }

    @Override
    public long contentLength() {
        return this.contentLength;
    }

    @Override
    public String getCharacterEncoding() {
        return this.characterEncoding;
    }

    @Override
    public String getContentType() {
        return this.contentType;
    }

    /*
     * Possible deprecated, but not clear yet
     * Use UploadContext.contentLength() instead
    */
    @Override    
    public int getContentLength() {
        return Long.valueOf(this.contentLength).intValue();
    }

    @Override
    public InputStream getInputStream() throws IOException {
        return inputStream;
    }

}
