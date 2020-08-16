package repository;

import java.io.IOException;
import java.util.List;

import com.google.gson.reflect.TypeToken;

import beans.Administrator;

public class AdministratorRepository extends AbstractRepository<Administrator, String>{

	public AdministratorRepository(String path) {
		super(path);
	}

	@Override
	public void init() {
		try {
			loadEntities(new TypeToken<List<Administrator>>() {}.getType());
		} catch (IOException e) {
			e.printStackTrace();
		}		
	}

}
