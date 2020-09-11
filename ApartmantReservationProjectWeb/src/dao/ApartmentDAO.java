package dao;

import java.io.IOException;
import java.util.List;

import com.google.gson.reflect.TypeToken;

import beans.Apartment;
import dao.sequencer.LongSequencer;

public class ApartmentDAO extends AbstractLongDAO<Apartment> {

	public ApartmentDAO(String path) {
		super(path, new LongSequencer());
	}

	@Override
	public void init() {
		try {
			loadEntities(new TypeToken<List<Apartment>>() {}.getType());
		} catch (IOException e) {
			e.printStackTrace();
		}
		
	}



}
