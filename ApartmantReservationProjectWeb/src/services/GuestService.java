package services;

import java.util.Collection;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import app.App;
import beans.Reservations;
import beans.User;
import dao.GuestDAO;
import dao.ReservationsDAO;

@Path("/guest")
public class GuestService {
	@Context
	ServletContext ctx;
	
	public GuestService() {
		
	}
	
	@PostConstruct
	public void init() {
		if (ctx.getAttribute("guestDAO") == null) {
			ctx.setAttribute("guestDAO", new GuestDAO(App.USERS_PATH));
		}
		
	}
	@GET
	@Path("/resrvations")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection <Reservations> getAll(User user) {
		ReservationsDAO reservationsDao = (ReservationsDAO)ctx.getAttribute("reservationDAO");
		return  reservationsDao.getMyReservatiionsGuest(user.getUsername());
	}
}