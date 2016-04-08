package org.utilities;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Enumeration;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;
import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class UnZip {

    private static final Logger LOG = LoggerFactory.getLogger(UnZip.class);

    public UnZip() {
        // NOPE
    }

    /**
     * Unzip the archive
     *
     * @param archive
     * @param outputDir
     * @throws java.io.IOException
     */
    public void unzipArchive(File archive, File outputDir) throws IOException, IllegalStateException {

        ZipFile zipfile = new ZipFile(archive);

        int numberOfEntries = zipfile.size();

        if (numberOfEntries > 0) {
            for (Enumeration e = zipfile.entries(); e.hasMoreElements();) {
                ZipEntry entry = (ZipEntry) e.nextElement();
                unzipEntry(zipfile, entry, outputDir);
            }
        } else {
            throw new IOException("The zip archive " + zipfile.getName() + " is empty/corrputed ...");
        }
    }

    private void unzipEntry(ZipFile zipfile, ZipEntry entry, File outputDir) throws IOException {

        if (entry.isDirectory()) {
            createDir(new File(outputDir, entry.getName()));
            return;
        }

        File outputFile = new File(outputDir, entry.getName());
        if (!outputFile.getParentFile().exists()) {
            createDir(outputFile.getParentFile());
        }

        LOG.info("Extracting entry ...");
        try (BufferedInputStream inputStream = new BufferedInputStream(zipfile.getInputStream(entry));
                BufferedOutputStream outputStream = new BufferedOutputStream(new FileOutputStream(outputFile))) {
            IOUtils.copy(inputStream, outputStream);
        }
    }

    private void createDir(File dir) throws IOException {
        LOG.info("Creating: {}", dir.getName());
        if (!dir.mkdirs()) {
            LOG.error("Creating a directory failed: {}", dir.getName());
            throw new IOException("Can not create dir " + dir);
        }
    }
}
