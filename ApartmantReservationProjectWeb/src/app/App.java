package app;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

@ApplicationPath("/rest") 
public class App extends Application {
	public static final String USERS_PATH = "C:/DB/usersDb.json";
	public static final String APARTMENTS_PATH = "C:/DB/apartmentsDb.json";

}
