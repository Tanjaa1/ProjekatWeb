package model;

import java.util.ArrayList;

public class Guest extends User {
	
	public ArrayList<Apartment> RentedApartments;
	public ArrayList<Reservations> ReservationsList;

	
	public Guest() {
		super();
		RentedApartments = new ArrayList<Apartment>();
		ReservationsList = new ArrayList<Reservations>();
	}


	public ArrayList<Apartment> getRentedApartments() {
		return RentedApartments;
	}


	public void setRentedApartments(ArrayList<Apartment> rentedApartments) {
		RentedApartments = rentedApartments;
	}


	public ArrayList<Reservations> getReservationsList() {
		return ReservationsList;
	}


	public void setReservationsList(ArrayList<Reservations> reservationsList) {
		ReservationsList = reservationsList;
	}
	
}
