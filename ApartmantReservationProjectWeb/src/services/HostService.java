package services;

import java.util.ArrayList;
import java.util.Collection;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;


import app.App;
import beans.Reservations;
import beans.User;
import dao.HostDAO;
import dao.ReservationsDAO;

@Path("/host")
public class HostService {
	@Context
	ServletContext ctx;
	
	public HostService() {
		
	}
	
	@PostConstruct
	public void init() {
		if (ctx.getAttribute("hostDAO") == null) {
			ctx.setAttribute("hostDAO", new HostDAO(App.USERS_PATH));
		}
		
	}
	@GET
	@Path("/resrvations")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection <Reservations> getAll(User user) {
		ReservationsDAO reservationsDao = (ReservationsDAO)ctx.getAttribute("reservationDAO");
		return  reservationsDao.getMyReservatiions(user.getUsername());
	}

	@GET
	@Path("/search")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<User> search(@QueryParam("search") String search){
		
		HostDAO userDao = (HostDAO) ctx.getAttribute("hostDAO");
		Collection<User> listapretraga= new ArrayList<User>();
		Collection<User> svi=userDao.findAll();
		try {
			String[] splits = search.split(";");
			if(!splits[0].equals(" ") && !splits[1].equals(" ") && !splits[2].equals(" ")){
				for(User u:svi){
					if(u.getUsername().contains(splits[0]) && u.getGenderString().contains(splits[1]) && u.getRoleString().contains(splits[2]) && !u.getDeleted())
						listapretraga.add(u);
				}
			}else if(!splits[0].equals(" ") && !splits[1].equals(" ")){
				for(User u:svi){
					if(u.getUsername().contains(splits[0]) && u.getGenderString().contains(splits[1]) && !u.getDeleted())
						listapretraga.add(u);
				}
			}else if(!splits[1].equals(" ") && !splits[2].equals(" ")){
				for(User u:svi){
					if(u.getUsername().contains(splits[1]) && u.getGenderString().contains(splits[2])  && !u.getDeleted())
						listapretraga.add(u);
				}
			}else if(!splits[0].equals(" ") && !splits[2].equals(" ")){
				for(User u:svi){
					if(u.getUsername().contains(splits[0]) && u.getGenderString().contains(splits[2])  && !u.getDeleted())
						listapretraga.add(u);
				}
			}else if(!splits[0].equals(" ")){
				for(User u:svi){
					if(u.getUsername().contains(splits[0])  && !u.getDeleted())
						listapretraga.add(u);
				}
			}else if(!splits[1].equals(" ")){
				for(User u:svi){
					if(u.getGenderString().contains(splits[1]) && !u.getDeleted())
						listapretraga.add(u);
				}
			}else if(!splits[2].equals(" ")){
				for(User u:svi){
					if(u.getGenderString().contains(splits[2]) && !u.getDeleted())
						listapretraga.add(u);
				}
			}else{
				return listapretraga;
			}
			return listapretraga;
		} catch (Exception e) {
			for(User u:svi){
				if(!u.getDeleted())
					listapretraga.add(u);
			}
			return listapretraga;
		}
	}
}
