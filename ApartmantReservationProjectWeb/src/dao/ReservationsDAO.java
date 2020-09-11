package dao;

import java.io.IOException;
import java.util.List;

import com.google.gson.reflect.TypeToken;


import beans.Reservations;
import dao.sequencer.LongSequencer;

public class ReservationsDAO extends AbstractLongDAO<Reservations> {

	public ReservationsDAO(String path) {
		super(path, new LongSequencer());
	}

	@Override
	public void init() {
		try {
			loadEntities(new TypeToken<List<Reservations>>() {}.getType());
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

}
