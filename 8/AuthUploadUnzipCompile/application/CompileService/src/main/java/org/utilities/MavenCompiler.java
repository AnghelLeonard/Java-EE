package org.utilities;

import java.io.File;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import org.apache.commons.lang3.exception.ExceptionUtils;
import org.apache.maven.shared.invoker.DefaultInvocationRequest;
import org.apache.maven.shared.invoker.DefaultInvoker;
import org.apache.maven.shared.invoker.InvocationOutputHandler;
import org.apache.maven.shared.invoker.InvocationRequest;
import org.apache.maven.shared.invoker.InvocationResult;
import org.apache.maven.shared.invoker.Invoker;
import org.apache.maven.shared.invoker.MavenInvocationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class MavenCompiler {

    private static final Logger LOG = LoggerFactory.getLogger(MavenCompiler.class);
  
    private final String pom;
    private final List<String> output;

    public MavenCompiler(String pom) {
        this.pom = pom;
        output = new ArrayList<>();
    }

    public List<String> compile() throws CompilationError {

        InvocationRequest request = new DefaultInvocationRequest();
        Invoker invoker = new DefaultInvoker();
        request.setPomFile(new File(pom));

        // we suppose that Maven is available in classpath
        // the system property maven.home and the environment variable M2_HOME are set
        // invoker.setMavenHome(new File("maven_home_path"));
        // invoker.setMavenHome(new File(System.getenv("M2_HOME")));
        InvocationOutputHandler handler;

        // The default handler would output to System.out,
        // and we don't want that.
        handler = (String arg) -> {
            output.add(arg);
        };

        request.setOutputHandler(handler);
        request.setErrorHandler(handler);

        LOG.info("Cleaning project ...");
        output.add("Cleaning project ...");
        request.setGoals(Collections.singletonList("clean"));

        try {
            InvocationResult cleanCompile = invoker.execute(request);

            if (cleanCompile.getExitCode() != 0) {
                LOG.info("Cleaning failed ...");
                output.add("Clean failed");
                //throw new IllegalStateException("Clean failed.");
            } else {
                // try to compile sources
                LOG.info("Try to compile sources (if any) ...");
                output.add("Try to compile sources (if any) ...");
                request.setGoals(Collections.singletonList("compile"));

                try {
                    InvocationResult resultCompile = invoker.execute(request);
                    if (resultCompile.getExitCode() != 0) {
                        LOG.info("Build failed");
                        output.add("Build failed");
                        //throw new IllegalStateException("Build failed.");
                    } else {
                        // try to execute Maven tests
                        LOG.info("Executing Maven tests (if any) ...");
                        output.add("Executing Maven tests (if any) ...");
                        request.setGoals(Collections.singletonList("test"));

                        try {
                            InvocationResult resultTest = invoker.execute(request);
                            if (resultTest.getExitCode() != 0) {
                                LOG.info("Some test(s) failed");
                                output.add("Some test(s) failed");
                                //throw new IllegalStateException("Some test(s) failed.");
                            }
                        } catch (MavenInvocationException e1) {
                            output.add("We cannot compile the file ... please, try later!");
                            LOG.error("Exception during Maven test execution: {}", ExceptionUtils.getRootCauseMessage(e1));
                            LOG.debug("Exception during Maven test execution (#compile()): {}", ExceptionUtils.getStackTrace(e1));
                        }
                    }
                } catch (MavenInvocationException e2) {
                    output.add("We cannot compile the file ... please, try later!");
                    LOG.error("Exception during Maven compile execution: {}", ExceptionUtils.getRootCauseMessage(e2));
                    LOG.debug("Exception during Maven compile execution (#compile()): {}", ExceptionUtils.getStackTrace(e2));
                }
            }
        } catch (MavenInvocationException e3) {
            output.add("We cannot compile the file ... please, try later!");
            LOG.error("Exception during Maven clean execution: {}", ExceptionUtils.getRootCauseMessage(e3));
            LOG.debug("Exception during Maven clean execution (#compile()): {}", ExceptionUtils.getStackTrace(e3));
        }

        return output;
    }
}
