package services;

import java.io.IOException;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import com.google.gson.JsonIOException;
import app.App;
import beans.Gender;
import beans.User;
import dao.UserDAO;

@Path("/users")
public class LoginService {
	
	@Context
	ServletContext ctx;
	
	public LoginService() {
		
	}
	
	@PostConstruct
	// ctx polje je null u konstruktoru, mora se pozvati nakon konstruktora (@PostConstruct anotacija)
	public void init() {
		// Ovaj objekat se instancira vi�e puta u toku rada aplikacije
		// Inicijalizacija treba da se obavi samo jednom
		if (ctx.getAttribute("userDAO") == null) {
			ctx.setAttribute("userDAO", new UserDAO(App.USERS_PATH));
		}
	}
	

	@GET
	@Path("/login")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public User login(@QueryParam("username") String username,@QueryParam("password") String password){
		UserDAO userDao = (UserDAO) ctx.getAttribute("userDAO");
		User user=userDao.find(username, password);
		return user;
	}
	@POST
	@Path("/logout")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public void logout(@Context HttpServletRequest request) {
		request.getSession().invalidate();
	}
	
	@GET
	@Path("/currentUser")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public User login(@Context HttpServletRequest request) {
		return (User) request.getSession().getAttribute("user");
	}
	
	@POST
	@Path("/add")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public String add(User user,@QueryParam("gender") String gender) throws JsonIOException, IOException{
		user.setGender(Gender.getGender(gender));
		UserDAO userDao = (UserDAO) ctx.getAttribute("userDAO");
		if(userDao.find(user.getUsername(),user.getPassword())!=null){			
			return "Ve� postoji";
		}
		userDao.save(user);
		return "Usepsno dodato";
		
	}
	
	@PUT
	@Path("/update")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public void update(User user) throws JsonIOException, IOException{
		UserDAO userDao = (UserDAO) ctx.getAttribute("userDAO");
		if(userDao.find(user.getUsername(),user.getPassword())!=null){			
			userDao.update(user);
		}
		
	}
}
