package beans;

import java.util.ArrayList;
import java.util.List;

public class Guest extends User implements IIdentifiable<String>{
	
	public List<Apartment> RentedApartments;
	public List<Reservations> ReservationsList;

	
	public Guest() {
		super();
		Role = Roles.Guest;
		RentedApartments = new ArrayList<Apartment>();
		ReservationsList = new ArrayList<Reservations>();
	}

	public List<Apartment> getRentedApartments() {
		return RentedApartments;
	}


	public void setRentedApartments(ArrayList<Apartment> rentedApartments) {
		RentedApartments = rentedApartments;
	}


	public List<Reservations> getReservationsList() {
		return ReservationsList;
	}


	public void setReservationsList(ArrayList<Reservations> reservationsList) {
		ReservationsList = reservationsList;
	}


	@Override
	public String getId() {
		return Username;
	}


	@Override
	public void setId(String id) {
		setUsername(id);
		
	}
	
}
