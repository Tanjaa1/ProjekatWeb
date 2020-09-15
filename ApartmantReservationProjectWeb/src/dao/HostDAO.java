package dao;

import java.io.IOException;
import java.util.Collection;
import java.util.List;

import com.google.gson.reflect.TypeToken;

import beans.Host;
import beans.User;


public class HostDAO extends AbstractDAO<Host,String> {
	public HostDAO(String path) {
		super(path);
	}

	@Override
	public void init() {
		try {
			loadEntities(new TypeToken<List<Host>>() {}.getType());
		} catch (IOException e) {
			e.printStackTrace();
		}
		
	}

	public Collection<User> findAll() {
		// TODO Auto-generated method stub
		return null;
	}

}