package org.utilities;

import java.io.File;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Locale;
import javax.tools.DiagnosticCollector;
import javax.tools.JavaCompiler;
import javax.tools.JavaCompiler.CompilationTask;
import javax.tools.JavaFileObject;
import javax.tools.StandardJavaFileManager;
import javax.tools.ToolProvider;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class JavaMainCompiler {

    private static final Logger LOG = LoggerFactory.getLogger(JavaMainCompiler.class);
   
    private File classesDir;
    private File sourceDir;
    private final List<String> output;

    public JavaMainCompiler(File classesDir, File sourceDir) {
        this.classesDir = classesDir;
        this.sourceDir = sourceDir;
        output = new ArrayList<>();
    }

    public List<String> compile() {
        JavaCompiler compiler = ToolProvider.getSystemJavaCompiler();

        if (compiler == null) {
            LOG.error("The Java compiler cannot be found. Compilation ends here ...");
            output.add("Sorry, for the moment we cannot compile your application! This is an internal issue.");
            
            // we also can throw an exception            
            // throw new CompilationError("Sorry, for the moment we cannot compile 
            // your application! This is an internal issue.");
            
            return output;            
        }

        DiagnosticCollector<JavaFileObject> diagnostics = new DiagnosticCollector<>();
        StandardJavaFileManager fileManager = compiler.getStandardFileManager(diagnostics, Locale.getDefault(), null);
        List<JavaFileObject> javaObjects = scanRecursivelyForJavaObjects(sourceDir, fileManager);

        if (javaObjects.isEmpty()) {
            LOG.info("No files to compile. Compilation ends here ...");
            output.add("There are no source files to compile.");
            
             // we also can throw an exception
            // throw new CompilationError("There are no source files to compile.");
            
            return output;           
        }
        
        String[] compileOptions = new String[]{"-d", classesDir.getAbsolutePath()};
        Iterable<String> compilationOptions = Arrays.asList(compileOptions);

        CompilationTask compilerTask = compiler.getTask(null, fileManager, diagnostics, 
                compilationOptions, null, javaObjects);

        if (!compilerTask.call()) {
            diagnostics.getDiagnostics().stream().map((diagnostic) -> {
                LOG.info("Porject cannot be compiled. Compilation ends here ...");
                output.add("Could not compile project.");
                return diagnostic;
            }).map((diagnostic) -> {
                output.add(diagnostic.getLineNumber() + ", " + diagnostic.getKind() + ", " + diagnostic);
                return diagnostic;
            }).forEach((diagnostic) -> {
                LOG.info("Error on line {} in {}", diagnostic.getLineNumber(), diagnostic);
            });                        
            
            // we also can throw an exception
            // throw new CompilationError("Could not compile project.");
            
        } else {
            output.add("BUILD SUCCESSFUL !");
        }

        LOG.info("Compilation successfully ended ...");
        
        return output;
    }

    private List<JavaFileObject> scanRecursivelyForJavaObjects(File dir, StandardJavaFileManager fileManager) {
        List<JavaFileObject> javaObjects = new LinkedList<>();
        File[] files = dir.listFiles();
        for (File file : files) {
            if (file.isDirectory()) {
                javaObjects.addAll(scanRecursivelyForJavaObjects(file, fileManager));
            } else if (file.isFile() && file.getName().toLowerCase().endsWith(".java")) {
                javaObjects.add(readJavaObject(file, fileManager));
            }
        }
        return javaObjects;
    }

    private JavaFileObject readJavaObject(File file, StandardJavaFileManager fileManager) {
        Iterable<? extends JavaFileObject> javaFileObjects = fileManager.getJavaFileObjects(file);
        Iterator<? extends JavaFileObject> it = javaFileObjects.iterator();
        if (it.hasNext()) {
            return it.next();
        }
        throw new RuntimeException("Could not load " + file.getAbsolutePath() + " java file object");
    }

    public File getClassesDir() {
        return classesDir;
    }

    public void setClassesDir(File classesDir) {
        this.classesDir = classesDir;
    }

    public File getSourceDir() {
        return sourceDir;
    }

    public void setSourceDir(File sourceDir) {
        this.sourceDir = sourceDir;
    }
}
