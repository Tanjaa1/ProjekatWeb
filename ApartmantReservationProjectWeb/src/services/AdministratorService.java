package services;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import com.google.gson.JsonIOException;
import com.sun.xml.internal.bind.v2.model.core.ID;

import app.App;
import beans.Gender;
import beans.Roles;
import beans.User;
import dao.AdministratorDAO;
import dao.UserDAO;


@Path("/admin")
public class AdministratorService {
	@Context
	ServletContext ctx;
	
	public AdministratorService() {
		
	}
	
	@PostConstruct
	public void init() {
		if (ctx.getAttribute("adminDAO") == null) {
			ctx.setAttribute("adminDAO", new AdministratorDAO(App.USERS_PATH));
		}
		if (ctx.getAttribute("userDAO") == null) {
			ctx.setAttribute("userDAO", new UserDAO(App.USERS_PATH));
		}
		
	}
	

	
	@POST
	@Path("/add")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public String add(User user,@QueryParam("gender") String gender) throws JsonIOException, IOException{
		user.setGender(Gender.getGenderS(gender));
		user.setRole(Roles.Host);
		user.setBlock("no");
		UserDAO userDao = (UserDAO) ctx.getAttribute("userDAO");
		if(userDao.find(user.getUsername(),user.getPassword())!=null){	
			return "Veæ postoji";
		}
		userDao.save(user);
		return "Usepsno dodato";
		
	}
	
	@GET
	@Path("/block")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public void block(@QueryParam("username") String username,@QueryParam("password") String password) throws JsonIOException, IOException{
		UserDAO userDao = (UserDAO) ctx.getAttribute("userDAO");
		User u=userDao.find(username,password);
		if(u!=null){
			User user=userDao.block(u);
			userDao.update(user);
		}
		
	}
	
	@GET
	@Path("/unblock")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public void unblock(@QueryParam("username") String username,@QueryParam("password") String password) throws JsonIOException, IOException{
		UserDAO userDao = (UserDAO) ctx.getAttribute("userDAO");
		User u=userDao.find(username,password);
		if(u!=null){
			User user=userDao.unblock(u);
			userDao.update(user);
		}
		
	}
	@GET
	@Path("/search")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<User> search(@QueryParam("search") String search){
		
		UserDAO userDao = (UserDAO) ctx.getAttribute("userDAO");
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
	
	@GET
	@Path("/delete")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public void delete(@QueryParam("username") String username) throws JsonIOException, IOException {
		UserDAO userDao = (UserDAO) ctx.getAttribute("userDAO");
		userDao.deleteLogical(username);
		
	}
}