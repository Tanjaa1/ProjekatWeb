package dao;
import java.io.IOException;
import java.util.List;

import com.google.gson.reflect.TypeToken;

import beans.Guest;


public class GuestDAO extends AbstractDAO<Guest,String>{

	public GuestDAO(String path) {
		super(path);
	}

	@Override
	public void init() {
		try {
			loadEntities(new TypeToken<List<Guest>>() {}.getType());
		} catch (IOException e) {
			e.printStackTrace();
		}		
	}


}
