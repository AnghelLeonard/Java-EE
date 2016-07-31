package sh.context;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRegistration;
import org.springframework.web.WebApplicationInitializer;
import org.springframework.web.context.ContextLoaderListener;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.servlet.DispatcherServlet;
import sh.simpleconfiguration.SHConfiguration;

/**
 *
 * @author Anghel Leonard
 */
public class WAC implements WebApplicationInitializer {

    @Override
    public void onStartup(ServletContext container) throws ServletException {

        AnnotationConfigWebApplicationContext ctx = new AnnotationConfigWebApplicationContext();
        ctx.register(SHConfiguration.class);
        container.addListener(new ContextLoaderListener(ctx));
        ctx.setServletContext(container);

        ServletRegistration.Dynamic servlet_dispatcher = container.addServlet("dispatcher", new DispatcherServlet(ctx));
        ServletRegistration.Dynamic servlet_rest = container.addServlet("rest-exporter", new DispatcherServlet(ctx));
        
        servlet_dispatcher.setLoadOnStartup(1);
        servlet_rest.setLoadOnStartup(2);
        servlet_rest.addMapping("/items/");
        servlet_dispatcher.addMapping("/");        
    }

}
