package app;

import static spark.Spark.get;
import static spark.Spark.port;
import static spark.Spark.post;
import static spark.Spark.staticFiles;

import java.io.Console;
import java.io.File;
import java.io.IOException;

import com.google.gson.Gson;

import beans.User;
import spark.Session;


public class SparkMain {
	private static Gson g = new Gson();

	public static void main(String[] args) throws IOException {
		port(9000);
		
		staticFiles.externalLocation(new File("./static").getCanonicalPath());

		get("/test", (req, res) -> {
			return "Works";
		});	
		
		post("/login", (req, res) -> {
			res.type("application/json");
			String payload = req.body();
			User u = g.fromJson(payload, User.class);
			Session ss = req.session(true);
			User user = ss.attribute("user");
			if (user == null) {
				user = u;
				ss.attribute("user", user);
			}
			return g.toJson(user);
		});
		
		get("/logout", (req, res) -> {
			res.type("application/json");
			Session ss = req.session(true);
			User user = ss.attribute("user");
			
			if (user != null) {
				ss.invalidate();
			}
			return true;
		});
	}


}
