package repository;

import java.io.IOException;
import java.util.List;

import com.google.gson.reflect.TypeToken;

import beans.Reservations;

public class ReservationsRrepository extends AbstractRepository<Reservations, Long>{

	public ReservationsRrepository(String path) {
		super(path);
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
