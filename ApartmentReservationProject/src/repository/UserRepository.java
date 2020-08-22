package repository;

import java.io.IOException;
import java.util.List;

import com.google.gson.reflect.TypeToken;

import beans.User;

public class UserRepository extends AbstractRepository<User, String>{

	public UserRepository(String path) {
		super(path);
	}

	@Override
	public void init() {
		try {
			loadEntities(new TypeToken<List<User>>() {}.getType());
		} catch (IOException e) {
			e.printStackTrace();
		}	
	}

}
