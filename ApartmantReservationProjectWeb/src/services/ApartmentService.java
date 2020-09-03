package services;

import javax.servlet.ServletContext;
import javax.ws.rs.Path;
import javax.ws.rs.core.Context;

import dao.ApatmentDAO;


@Path("/apartment")
public class ApartmentService {
	
	@Context
	ServletContext ctx;
	
	public ApartmentService(){}
	
	public void init() {
		if (ctx.getAttribute("apartmentDAO") == null) {
	    	String contextPath = ctx.getRealPath("");
			ctx.setAttribute("apartmentDAO", new ApatmentDAO(contextPath));
		}
	}

}
