package spring.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 *
 * @author Leonard
 */
@Controller
public class HelloController {

    @RequestMapping("/welcome")
    public ModelAndView helloWorld() {

        String message = "<br><div style='text-align:center;'>"
                + "<h3>Hello World, Spring MVC Tutorial</h3>This message is coming from HelloController.java</div><br><br>";
        return new ModelAndView("welcome", "message", message);
    }
}
