package pro.javaee8.models;

import java.time.LocalDate;
import java.util.List;

public class Register {

    private String email;
    public LocalDate birthdate;

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

}
