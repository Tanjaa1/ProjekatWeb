package dao;

import java.io.IOException;
import java.util.List;

import com.google.gson.reflect.TypeToken;

import beans.Address;
import dao.sequencer.LongSequencer;

public class AddressDAO extends AbstractLongDAO<Address>{

	public AddressDAO(String path) {
		super(path, new LongSequencer());
	}

	@Override
	public void init() {
		try {
			loadEntities(new TypeToken<List<Address>>() {}.getType());
		} catch (IOException e) {
			e.printStackTrace();
		}
		
	}
	
}