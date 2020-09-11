package dao;

import java.io.IOException;
import java.util.List;

import com.google.gson.reflect.TypeToken;

import beans.Amenities;
import dao.sequencer.LongSequencer;

public class AmenitiesDAO extends AbstractLongDAO<Amenities>{

	public AmenitiesDAO(String path) {
		super(path, new LongSequencer());
	}

	@Override
	public void init() {
		try {
			loadEntities(new TypeToken<List<Amenities>>() {}.getType());
		} catch (IOException e) {
			e.printStackTrace();
		}
		
	}

}
