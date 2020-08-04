package model;

import java.util.Date;

public class Reservations {
	
	public String ReservatedApartment;
	public Date StartDate;
	public int NumberOfStayingNights;
	public double TotalPrise;
	public String Message;
	public Guest GuestWhoStays;
	public enum Status { KREIRANA, ODBIJENA, ODUSTANAK, PRIHVACENA, ZAVRSENA }
	
	
	public Reservations() {	}

	public Reservations(String reservatedApartment, Date startDate, int numberOfStayingNights, double totalPrise,
			String message, Guest guestWhoStays) {
		super();
		ReservatedApartment = reservatedApartment;
		StartDate = startDate;
		NumberOfStayingNights = numberOfStayingNights;
		TotalPrise = totalPrise;
		Message = message;
		GuestWhoStays = guestWhoStays;
	}
	

	public String getReservatedApartment() {
		return ReservatedApartment;
	}

	public void setReservatedApartment(String reservatedApartment) {
		ReservatedApartment = reservatedApartment;
	}

	public Date getStartDate() {
		return StartDate;
	}

	public void setStartDate(Date startDate) {
		StartDate = startDate;
	}

	public int getNumberOfStayingNights() {
		return NumberOfStayingNights;
	}

	public void setNumberOfStayingNights(int numberOfStayingNights) {
		NumberOfStayingNights = numberOfStayingNights;
	}

	public double getTotalPrise() {
		return TotalPrise;
	}

	public void setTotalPrise(double totalPrise) {
		TotalPrise = totalPrise;
	}

	public String getMessage() {
		return Message;
	}

	public void setMessage(String message) {
		Message = message;
	}

	public Guest getGuestWhoStays() {
		return GuestWhoStays;
	}

	public void setGuestWhoStays(Guest guestWhoStays) {
		GuestWhoStays = guestWhoStays;
	}
	
	
}
