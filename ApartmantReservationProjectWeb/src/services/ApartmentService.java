package services;

import java.io.IOException;
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
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import com.google.gson.JsonIOException;

import app.App;
import beans.ActiveApartment;
import beans.Apartment;
import beans.User;
import dao.ApartmentDAO;


@Path("/apartment")
public class ApartmentService {
	
	@Context
	ServletContext ctx;
	
	@Context
	HttpServletRequest request;
	
	
	public ApartmentService(){}
	
	@PostConstruct
	public void init() {
		if (ctx.getAttribute("apartmentDAO") == null) {
	    	ctx.setAttribute("apartmentDAO", new ApartmentDAO(App.APARTMENTS_PATH));
		}
	}
	
	@POST
	@Path("/add")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Apartment saveData(Apartment apartment) throws JsonIOException, IOException {
		ApartmentDAO apartmentDao = (ApartmentDAO)ctx.getAttribute("apartmentDAO");
		return apartmentDao.save(apartment);
	}
	
	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Apartment getById(@PathParam("id")Long id) {
		ApartmentDAO apartmentDao = (ApartmentDAO)ctx.getAttribute("apartmentDAO");
		return apartmentDao.getById(id);
	}
	
	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection <Apartment> getAll() {
		ApartmentDAO apartmentDao = (ApartmentDAO)ctx.getAttribute("apartmentDAO");
		return  apartmentDao.getAll().values();
	}
	
	@GET
	@Path("/active")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection <Apartment> getAllActive() {
		ApartmentDAO apartmentDao = (ApartmentDAO)ctx.getAttribute("apartmentDAO");
		
		Collection<Apartment> list = new ArrayList<Apartment>();
		for(Apartment a : apartmentDao.getAll().values()) {
			if(a.isActive == ActiveApartment.active) {
				list.add(a);
			}
		}
				
		return list;
	}
	
	
	@GET
	@Path("/byHost")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection <Apartment> getAllByHost() {
		ApartmentDAO apartmentDao = (ApartmentDAO)ctx.getAttribute("apartmentDAO");
		User u= (User) request.getSession().getAttribute("user");
		
		Collection<Apartment> a = new ArrayList<Apartment>();
		for (Apartment ap : apartmentDao.getAll().values()) {
			if(ap.getApartmentHost().equals(u.getUsername())) {
				a.add(ap);
			}
		}
		
		return a;
	}
	
	@GET
	@Path("/delete/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public void delete(@PathParam("id")Long id) throws JsonIOException, IOException {
		ApartmentDAO apartmentDao = (ApartmentDAO)ctx.getAttribute("apartmentDAO");
		apartmentDao.deleteLogical(id);
	}
	
	@GET
	@Path("/activate/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public void activate(@PathParam("id")Long id) throws JsonIOException, IOException {
		ApartmentDAO apartmentDao = (ApartmentDAO)ctx.getAttribute("apartmentDAO");
		Apartment apartment = apartmentDao.getById(id);
		apartment.setActive(ActiveApartment.active);
		apartmentDao.save(apartment);
	}
	
	@GET
	@Path("/deactivate/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public void deactivate(@PathParam("id")Long id) throws JsonIOException, IOException {
		ApartmentDAO apartmentDao = (ApartmentDAO)ctx.getAttribute("apartmentDAO");
		Apartment apartment = apartmentDao.getById(id);
		apartment.setActive(ActiveApartment.inactive);
		apartmentDao.save(apartment);
	}
	
	@GET
	@Path("/dates/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<String> availableDate(@PathParam("id")Long id) throws JsonIOException, IOException {
		ApartmentDAO apartmentDao = (ApartmentDAO)ctx.getAttribute("apartmentDAO");
		Apartment apartment = apartmentDao.getById(id);

		Collection<String> availableDateString=apartmentDao.getAvailableDate(apartment);
         
		return availableDateString;
	}
}
