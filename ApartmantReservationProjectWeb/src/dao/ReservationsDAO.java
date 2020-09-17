package dao;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.google.gson.reflect.TypeToken;

import beans.Apartment;
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
				String u=r.getReservatedApartment().getApartmentHost();
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
	
	public Double getCost(int numberOfStayingNights, Date startDate, Apartment ap) {
		Collection<Date> forRes=newlistDays(numberOfStayingNights, startDate);
		double cena=0;
		for(Date d:forRes){
			@SuppressWarnings("deprecation")
			Integer br=d.getDay();	
			if(br>4 || br==0){
				 cena+=(90*ap.getPricePerStayingNight())/100;	
			}else
				cena+=ap.getPricePerStayingNight();
		}
		return cena;
	}
	
	public Collection<Date> newlistDays(int numberOfStayingNights, Date startDate) {
		Collection<Date> forRes=new ArrayList<Date>();
		
			for(int i=0;i<numberOfStayingNights;i++){
				forRes.add(startDate);
				startDate = new Date(startDate.getTime() + (1000 * 60 * 60 * 24));
			}
			return forRes;
	}
}
