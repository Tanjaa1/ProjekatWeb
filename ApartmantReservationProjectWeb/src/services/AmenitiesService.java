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
import beans.Amenities;
import dao.AmenitiesDAO;

@Path("/amenities")
public class AmenitiesService {
	@Context
	ServletContext ctx;
	
	public AmenitiesService() {}
	
	@PostConstruct
	public void init() {
		if (ctx.getAttribute("amenitiesDAO") == null) {
	    	ctx.setAttribute("amenitiesDAO", new AmenitiesDAO(App.AMENITIES_PATH));
		}
	}
	
	@POST
	@Path("/add")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Amenities saveData(Amenities amenities) throws JsonIOException, IOException {
		AmenitiesDAO amenitiesDao = (AmenitiesDAO)ctx.getAttribute("amenitiesDAO");
		return amenitiesDao.save(amenities);
	}
	
	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Amenities getById(@PathParam("id")Long id) {
		AmenitiesDAO amenitiesDao = (AmenitiesDAO)ctx.getAttribute("amenitiesDAO");
		return amenitiesDao.getById(id);
	}
	
	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection <Amenities> getAll() {
		AmenitiesDAO amenitiesDao = (AmenitiesDAO)ctx.getAttribute("amenitiesDAO");
		return  amenitiesDao.getAll().values();
	}
	
	@GET
	@Path("/delete/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public void delete(@PathParam("id")Long id) throws JsonIOException, IOException {
		AmenitiesDAO amenitiesDao = (AmenitiesDAO)ctx.getAttribute("amenitiesDAO");
		amenitiesDao.deleteLogical(id);
	}
	
}
