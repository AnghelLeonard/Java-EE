package pro.javaee8.models;

import java.time.LocalDate;
import java.time.LocalTime;

public class Register {

    private String email;
    public LocalDate birthdate;
    public LocalTime birthtime;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDate getBirthdate() {
        return birthdate;
    }

    public void setBirthdate(LocalDate birthdate) {
        this.birthdate = birthdate;
    }

    public LocalTime getBirthtime() {
        return birthtime;
    }

    public void setBirthtime(LocalTime birthtime) {
        this.birthtime = birthtime;
    }
        
}
