package app;

import static spark.Spark.get;
import static spark.Spark.port;
import static spark.Spark.staticFiles;


import java.io.File;
import java.io.IOException;


public class SparkMain {

	public static void main(String[] args) throws IOException {
		port(8085);
		
		staticFiles.externalLocation(new File("./static").getCanonicalPath());
		
		get("/test", (req, res) -> {
			return "Works";
		});
		
		post("/rest/demo/forma", (req, res) -> {
			res.type("application/json");
			String korisnkicko_ime = req.queryParams("korisnicko_ime");
			String lozinka = req.queryParams("lozinka");
			User s = new User(korisnkicko_ime, lozinka);
			return g.toJson(s);
		});
		
		
		post("/rest/demo/login", (req, res) -> {
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
		
		get("/rest/demo/logout", (req, res) -> {
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
