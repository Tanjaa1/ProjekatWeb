package services;

import java.io.IOException;
import java.util.Collection;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
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
import dao.ApartmentDAO;


@Path("/apartment")
public class ApartmentService {
	
	@Context
	ServletContext ctx;
	
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
