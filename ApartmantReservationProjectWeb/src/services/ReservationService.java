package services;

import java.io.IOException;
import java.util.Date;
import java.util.ArrayList;
import java.util.Collection;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import com.google.gson.JsonIOException;

import app.App;
import beans.Apartment;
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
		ReservationsDAO reservationDAO = (ReservationsDAO)ctx.getAttribute("reservationDAO");
		
		User curuser=(User) request.getSession().getAttribute("user");
		reservations.setGuestWhoStays(curuser);
		reservations.setDeleted(false);
		reservations.setStatus(ReservationStatus.Created);
		reservations.setTotalPrise(reservationDAO.getCost(reservations.getNumberOfStayingNights(), reservations.getStartDate(), reservations.getReservatedApartment()));
		
		ApartmentDAO apDAO = (ApartmentDAO)ctx.getAttribute("apartmentDAO");
		Apartment ap=apDAO.getById(reservations.ReservatedApartment.getId());
		ArrayList<Long> reservationsApartment=ap.getListOfReservations();
		if(reservationsApartment==null)
			reservationsApartment=new ArrayList<Long>();

		Reservations r= reservationDAO.save(reservations);
		reservationsApartment.add(r.getId());
		ap.setListOfReservations(reservationsApartment);
		
		//ArrayList<Date> newD=(ArrayList<Date>) reservationDAO.availableDaysNew(ap.getAvailableDates(),reservations.getNumberOfStayingNights(),reservations.getStartDate());
		///ap.setAvailableDatesForRent(newD);
		apDAO.update(ap);
//		if(newD==null)
//			return null;
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
	
	@GET
	@Path("/host")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection <Reservations> getHost() {
		User user= (User) request.getSession().getAttribute("user");
		ReservationsDAO reservationsDao = (ReservationsDAO)ctx.getAttribute("reservationDAO");
		return  reservationsDao.getHost(user,reservationsDao.getAll().values());
	}
	
	@GET
	@Path("/guest")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection <Reservations> getGuest() {
		User user= (User) request.getSession().getAttribute("user");
		ReservationsDAO reservationsDao = (ReservationsDAO)ctx.getAttribute("reservationDAO");
		return  reservationsDao.getGuest(user,reservationsDao.getAll().values());
	}
	
	@GET
	@Path("/stat")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Collection <Reservations> getStat(@QueryParam("stat") String stat) {
		ReservationsDAO reservationsDao = (ReservationsDAO)ctx.getAttribute("reservationDAO");
		return  reservationsDao.getStat(stat,reservationsDao.getAll().values());
	}
	
	@GET
	@Path("/sort")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Reservations> getSort(@QueryParam("sort") String sort) {
		ReservationsDAO reservationsDao = (ReservationsDAO)ctx.getAttribute("reservationDAO");
		reservationsDao.Opadajuce();
		return  null;
	}
	
	@POST
	@Path("/cost")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Double cost(Reservations reservations) throws JsonIOException, IOException {
		ReservationsDAO reservationsDao = (ReservationsDAO)ctx.getAttribute("reservationDAO");
		return reservationsDao.getCost(reservations.getNumberOfStayingNights(), reservations.getStartDate(), reservations.getReservatedApartment());
	}
	@GET
	@Path("/odb")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Reservations> odbijam(@QueryParam("res") String res) throws JsonIOException, IOException {
		ReservationsDAO reservationsDao = (ReservationsDAO)ctx.getAttribute("reservationDAO");
		Collection<Reservations> reserv=getAll();
		Reservations reservations=reservationsDao.find(res,reserv,ReservationStatus.DropedOut);
		reservationsDao.update(reservations);
		return  reservationsDao.getAll().values();
	}
	
	@GET
	@Path("/odust")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Reservations> odustajem(@QueryParam("res") String res) throws JsonIOException, IOException {
		ReservationsDAO reservationsDao = (ReservationsDAO)ctx.getAttribute("reservationDAO");
		Collection<Reservations> reserv=getAll();
		Reservations reservations=reservationsDao.find(res,reserv,ReservationStatus.Rejected);
		reservationsDao.update(reservations);
		return  reservationsDao.getAll().values();
	}
	@GET
	@Path("/prihv")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Reservations> prihvatam(@QueryParam("res") String res) throws JsonIOException, IOException {
		ReservationsDAO reservationsDao = (ReservationsDAO)ctx.getAttribute("reservationDAO");
		Collection<Reservations> reserv=getAll();
		Reservations reservations=reservationsDao.find(res,reserv,ReservationStatus.Accepted);
		reservationsDao.update(reservations);
		return  reservationsDao.getAll().values();
	}
	
	@GET
	@Path("/search")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<User> moji(){
		User user= (User) request.getSession().getAttribute("user");
		ReservationsDAO reservationsDao = (ReservationsDAO)ctx.getAttribute("reservationDAO");
		Collection<Reservations> reserv=getAll();
		return  reservationsDao.getMy(user.getUsername(),reserv);
	}
}
