package services;

import java.io.IOException;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.google.gson.JsonIOException;
import app.App;
import beans.Gender;
import beans.Roles;
import beans.User;
import dao.UserDAO;

@Path("/users")
public class LoginService {
	
	@Context
	ServletContext ctx;
	
	@Context
	HttpServletRequest request;
	
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
	

	@POST
	@Path("/login")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response login(User user){
		UserDAO userDao = (UserDAO) ctx.getAttribute("userDAO");
		User find=userDao.find(user.getUsername(), user.getPassword());
		if (find == null) {
			return Response.status(400).entity("Invalid username and/or password").build();
		}
		if(find.getBlock().equals("yes")){
			return Response.status(400).entity("User blocked").build();
		}
		request.getSession().setAttribute("user", find);
		return Response.status(200).build();
	}
	@POST
	@Path("/logout")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public void logout() {
		request.getSession().invalidate();
	}
	
	@GET
	@Path("/currentUser")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public User login() {
		return (User) request.getSession().getAttribute("user");
	}
	
	@POST
	@Path("/add")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public String add(User user,@QueryParam("gender") String gender) throws JsonIOException, IOException{
		user.setGender(Gender.getGenderS(gender));
		user.setRole(Roles.Guest);
		user.setBlock("no");
		UserDAO userDao = (UserDAO) ctx.getAttribute("userDAO");
		if(userDao.find(user.getUsername(),user.getPassword())!=null){	
			return "Ve� postoji";
		}
		userDao.save(user);
		return "Usepsno dodato";
		
	}
	
	@GET
	@Path("/update")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public void update(@QueryParam("info") String info) throws JsonIOException, IOException{
		UserDAO userDao = (UserDAO) ctx.getAttribute("userDAO");
		System.out.println(info);
		User user=login();
		try {
		String[] users=info.split(";");
			if(users.length>1)
				user.setName(users[0]);
			user.setSurname(users[1]);
			if(users[2].equals("Mu�ko"))
				user.setGender(Gender.Male);
			else
				user.setGender(Gender.Female);
		} catch (Exception e) {
			user.setPassword(info);
		}
			userDao.update(user);
		
	}
}
