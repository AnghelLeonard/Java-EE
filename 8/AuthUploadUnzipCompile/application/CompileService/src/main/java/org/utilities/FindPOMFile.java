package org.utilities;

import java.io.File;
import java.util.Collection;
import java.util.Iterator;
import org.apache.commons.io.FileUtils;

public class FindPOMFile {

    private final File sourceDir;

    public FindPOMFile(File sourceDir) {
        this.sourceDir = sourceDir;
    }

    public String findPOM() {

        Collection filescol;
        File file;
        
        filescol = FileUtils.listFiles(sourceDir, new String[]{"xml"}, true);

        if ((filescol != null) && (!filescol.isEmpty())) {
            
            for (Iterator iterator = filescol.iterator(); iterator.hasNext();) {
                file = (File) iterator.next();
                // take into account the first pom.xml found
                // usually, when there is more than one pom.xml, the main pom.xml
                // is the most outer in the hierarchy of project folders
                if (file.getName().equalsIgnoreCase("pom.xml")) {
                    return file.getAbsolutePath();
                }
            }
        }

        return null;
    }
}
