package dao;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.io.IOException;
import java.util.List;

import com.google.gson.reflect.TypeToken;

import beans.User;

public class UserDAO extends AbstractDAO<User,String> {
	private Map<String, User> users = new HashMap<>();
	
	
	public UserDAO(String path) {
		super(path);
		init();
	}
	
	@Override
	public void init() {
			try {
				users=loadEntities(new TypeToken<List<User>>() {
				}.getType());
			} catch (IOException e) {
				e.printStackTrace();
			}

		
	}
	
	
	/**
	 * Vraæa korisnika za prosleðeno korisnièko ime i šifru. Vraæa null ako korisnik ne postoji
	 * @param username
	 * @param password
	 * @return
	 */
	public User find(String username, String password){
		if (!users.containsKey(username)) {
			return null;
		}
		User user = users.get(username);
		if (!user.getPassword().equals(password)) {
			return null;
		}
		return user;
	}
	
	public Boolean findForRef(String username, String password){
		if (users.containsKey(username)) {
			return true;
		}
		return false;
	}
	
	public Collection<User> findAll() {
		return users.values();
	}
	
	public User block(User user){
		user.setBlock("yes");
		return user;
	}
	public User unblock(User user){
		user.setBlock("no");
		return user;
	}
	
}
