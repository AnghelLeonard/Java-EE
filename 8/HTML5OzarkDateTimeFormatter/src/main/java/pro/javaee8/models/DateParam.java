package pro.javaee8.models;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;

public class DateParam {

    private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    private LocalDate date;

    public DateParam(String dateStr) throws WebApplicationException {
        if (dateStr.isEmpty()) {
            date = null;
            return;
        }
        try {
            date = LocalDate.parse(dateStr, formatter);
        } catch (DateTimeParseException e) {
            throw new WebApplicationException(Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("error.jsp").build());
        }
    }

    public LocalDate getDate() {
        return date;
    }

    @Override
    public String toString() {
        if (date != null) {
            return date.toString();
        } else {
            return "";
        }
    }
}
