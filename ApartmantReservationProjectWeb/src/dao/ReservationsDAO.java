package dao;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.google.gson.reflect.TypeToken;

import beans.Reservations;
import dao.sequencer.LongSequencer;

public class ReservationsDAO extends AbstractLongDAO<Reservations> {
	private Map<Long, Reservations> reservations = new HashMap<>();
	
	public ReservationsDAO(String path) {
		super(path, new LongSequencer());
	}

	@Override
	public void init() {
		try {
			reservations =loadEntities(new TypeToken<List<Reservations>>() {}.getType());
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public Collection<Reservations> findAll() {
		return reservations.values();
	}

	public Collection<Reservations> getMyReservatiions(String username) {
		Collection<Reservations> res=new ArrayList<Reservations>();
			for(Reservations r:reservations.values()){
				String u=r.getReservatedApartment().getApartmentHost().getUsername();
				if(u.equals(username)){
					res.add(r);
				}
			}
		return res;
	}

	public Collection<Reservations> getMyReservatiionsGuest(String username) {
		Collection<Reservations> res=new ArrayList<Reservations>();
			for(Reservations r:reservations.values()){
				String u=r.getGuestWhoStays().getUsername();
				if(u.equals(username)){
					res.add(r);
				}
			}
		return res;
	}
}
