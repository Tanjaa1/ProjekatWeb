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
import beans.ReservationStatus;
import beans.Reservations;
import beans.User;
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
	
	public ArrayList<Date> newlistDays(int numberOfStayingNights, Date startDate) {
		ArrayList<Date> forRes=new ArrayList<Date>();
		
			for(int i=0;i<numberOfStayingNights;i++){
				forRes.add(startDate);
				startDate = new Date(startDate.getTime() + (1000 * 60 * 60 * 24));
			}
			return forRes;
	}
	
	public List<Date> availableDaysNew(List<Date> list,int numberOfStayingNights, Date startDate) {
		ArrayList<Date> dates=newlistDays(numberOfStayingNights, startDate);
		int indeks=-1;
		for(int i=0;i<list.size();i++){
			if(list.get(i)==startDate){
				indeks=i;
				for(Date d:dates){
					if(d!=list.get(i)){
						return null;
					}
					i++;
				}
			}
		}
		if(indeks==-1)
			return null;
		for(int i=indeks;i<numberOfStayingNights;i++){
			list.remove(i);
		}
		return list;
	}
	
	public void Opadajuce(){
		// TODO Auto-generated method stub
		
	}

	public void Ratuce() {
		// TODO Auto-generated method stub
		
	}

	public Collection<Reservations> getStat(String status,Collection<Reservations> collection) {
		Collection<Reservations> resStat=new ArrayList<Reservations>();
		for(Reservations res:collection){
			if(res.getStatusS().equals(status)){
				resStat.add(res);
			}
		}
		return resStat;
	}

	public Collection<Reservations> getHost(User user,Collection<Reservations> collection) {
		Collection<Reservations> res=new ArrayList<Reservations>();
			for(Reservations r:collection){
				if(r.getReservatedApartment().getApartmentHost().equals(user.getUsername())){
					res.add(r);
				}
			}
		return res;
	}

	public Collection<Reservations> getGuest(User user,Collection<Reservations> collection) {
		Collection<Reservations> res=new ArrayList<Reservations>();
		for(Reservations r:collection){
			System.out.println(user);
			if(r.getGuestWhoStays().getUsername().equals(user.getUsername())){
				res.add(r);
			}
		}
		return res;
	}
	
}
