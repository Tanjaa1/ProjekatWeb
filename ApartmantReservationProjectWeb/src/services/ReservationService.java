package services;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import com.google.gson.JsonIOException;

import app.App;
import beans.Apartment;
import beans.Guest;
import beans.ReservationStatus;
import beans.Reservations;
import beans.User;
import dao.ApartmentDAO;
import dao.ReservationsDAO;

@Path("/reservations")
public class ReservationService {
	
	@Context
	ServletContext ctx;
	
	
	@Context
	HttpServletRequest request;
	
	public ReservationService(){}
	
	@PostConstruct
	public void init() {
		if (ctx.getAttribute("reservationDAO") == null) {
	    	ctx.setAttribute("reservationDAO", new ReservationsDAO(App.RESERVATION_PATH));
		}
	}
	
	@POST
	@Path("/add")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Reservations saveData(Reservations reservations) throws JsonIOException, IOException {
		User curuser=(User) request.getSession().getAttribute("user");
		reservations.setGuestWhoStays(curuser);
		reservations.setDeleted(false);
		reservations.setStatus(ReservationStatus.Created);
		reservations.setTotalPrise(reservations.getReservatedApartment().getPricePerStayingNight()*reservations.getNumberOfStayingNights());
		ReservationsDAO reservationDAO = (ReservationsDAO)ctx.getAttribute("reservationDAO");
		
		ApartmentDAO apDAO = (ApartmentDAO)ctx.getAttribute("apartmentDAO");
		Apartment ap=apDAO.getById(reservations.ReservatedApartment.getId());
		ArrayList<Long> reservationsApartment=ap.getListOfReservations();
		if(reservationsApartment==null)
			reservationsApartment=new ArrayList<Long>();

		Reservations r= reservationDAO.save(reservations);
		reservationsApartment.add(r.getId());
		ap.setListOfReservations(reservationsApartment);
		
		//apDAO.newlistDays(reservations.getNumberOfStayingNights(),reservations.getStartDate());
		
		apDAO.update(ap);
		
		return r;
	}
	
	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Reservations getById(@PathParam("id")Long id) {
		ReservationsDAO reservationsDao = (ReservationsDAO)ctx.getAttribute("reservationDAO");
		return reservationsDao.getById(id);
	}
	
	@GET
	@Path("/all")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection <Reservations> getAll() {
		ReservationsDAO reservationsDao = (ReservationsDAO)ctx.getAttribute("reservationDAO");
		return  reservationsDao.getAll().values();
	}
	
	
	@POST
	@Path("/cost")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Double cost(Reservations reservations) throws JsonIOException, IOException {
		ReservationsDAO reservationsDao = (ReservationsDAO)ctx.getAttribute("reservationDAO");
		return reservationsDao.getCost(reservations.getNumberOfStayingNights(), reservations.getStartDate(), reservations.getReservatedApartment());
	}
	
}
