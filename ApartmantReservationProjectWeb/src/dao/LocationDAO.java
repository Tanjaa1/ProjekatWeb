package dao;

import java.io.IOException;
import java.util.List;

import com.google.gson.reflect.TypeToken;

import beans.Location;
import dao.sequencer.LongSequencer;

public class LocationDAO extends AbstractLongDAO<Location>{

	public LocationDAO(String path) {
		super(path, new LongSequencer());

	}

	@Override
	public void init() {
		try {
			loadEntities(new TypeToken<List<Location>>() {}.getType());
		} catch (IOException e) {
			e.printStackTrace();
		}
		
	}

}
