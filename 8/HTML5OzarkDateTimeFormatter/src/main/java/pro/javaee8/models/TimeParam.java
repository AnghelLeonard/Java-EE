package pro.javaee8.models;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;

public class TimeParam {

    private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm");
    private LocalTime time;

    public TimeParam(String dateStr) throws WebApplicationException {
        if (dateStr.isEmpty()) {
            time = null;
            return;
        }
        try {
            time = LocalTime.parse(dateStr, formatter);
        } catch (DateTimeParseException e) {
            throw new WebApplicationException(Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("error.jsp").build());
        }
    }

    public LocalTime getTime() {
        return time;
    }

    @Override
    public String toString() {
        if (time != null) {
            return time.toString();
        } else {
            return "";
        }
    }
}
