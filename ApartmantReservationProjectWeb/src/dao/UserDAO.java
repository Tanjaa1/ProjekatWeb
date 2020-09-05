package dao;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.StringTokenizer;
import java.io.IOException;
import java.util.List;

import com.google.gson.reflect.TypeToken;

import beans.User;

public class UserDAO extends AbstractDAO<User, String> {
	private Map<String, User> users = new HashMap<>();
	
	
	public UserDAO(String path) {
		super(path);
	}
	
	@Override
	public void init() {
			try {
				loadEntities(new TypeToken<List<User>>() {
				}.getType());
			} catch (IOException e) {
				e.printStackTrace();
			}

		
	}
	
	/***
	 * @param contextPath Putanja do aplikacije u Tomcatu. Može se pristupiti samo iz servleta.
	 */
	/*public UserDAO(String contextPath) {
		loadUsers(contextPath);
	}
	
	/**
	 * Vraæa korisnika za prosleðeno korisnièko ime i šifru. Vraæa null ako korisnik ne postoji
	 * @param username
	 * @param password
	 * @return
	 */
	public User find(String username, String password) {
		if (!users.containsKey(username)) {
			return null;
		}
		User user = users.get(username);
		if (!user.getPassword().equals(password)) {
			return null;
		}
		return user;
	}
	
	public Collection<User> findAll() {
		return users.values();
	}
	
	/**
	 * Uèitava korisnike iz WebContent/users.txt fajla i dodaje ih u mapu {@link #users}.
	 * Kljuè je korisnièko ime korisnika.
	 * @param contextPath Putanja do aplikacije u Tomcatu
	 */
	private void loadUsers(String contextPath) {
		BufferedReader in = null;
		try {
			File file = new File(contextPath + "/users.txt");
			in = new BufferedReader(new FileReader(file));
			String line;
			StringTokenizer st;
			while ((line = in.readLine()) != null) {
				line = line.trim();
				if (line.equals("") || line.indexOf('#') == 0)
					continue;
				st = new StringTokenizer(line, ";");
				while (st.hasMoreTokens()) {					
					String name = st.nextToken().trim();
					String surname = st.nextToken().trim();
					String username = st.nextToken().trim();
					String password = st.nextToken().trim();
					users.put(username, new User(username,password));
				}
				
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			if (in != null) {
				try {
					in.close();
				}
				catch (Exception e) { }
			}
		}
	}
	
	public String addUser(User user){
		return "Registracija je uspela";
	}

	
}
