package model;

import java.util.ArrayList;
import java.util.Date;

public class Apartment {
	
	public enum ApartmentType { CEO_APARTMAN, SOBA }
	public int NumberOfRooms;
	public int NumberOfGuests;
	public Location LocationOfApartment;
	public Date AvailableDatesForRent;
	public Date Availability;
	public Host ApartmentHost;
	public Comment PostedComments;
	public double PricePerStayingNight;
	public Date CheckInTime;
	public Date CheckOutTime;
	public boolean isActive; //status => aktivno = true; neaktivno = false
	public ArrayList<Amenities> AmenitiesList;
	public ArrayList<Reservations> ListOfReservations;
	
	
	public Apartment() { }	
	
	public Apartment(int numberOfRooms, int numberOfGuests, Location locationOfApartment, Date availableDatesForRent,
			Date availability, Host apartmentHost, Comment postedComments, double pricePerStayingNight,
			Date checkInTime, Date checkOutTime, boolean isActive) {
		super();
		NumberOfRooms = numberOfRooms;
		NumberOfGuests = numberOfGuests;
		LocationOfApartment = locationOfApartment;
		AvailableDatesForRent = availableDatesForRent;
		Availability = availability;
		ApartmentHost = apartmentHost;
		PostedComments = postedComments;
		PricePerStayingNight = pricePerStayingNight;
		CheckInTime = checkInTime;
		CheckOutTime = checkOutTime;
		this.isActive = isActive;
		AmenitiesList = new ArrayList<Amenities>();
		ListOfReservations = new ArrayList<Reservations>();
	}

	public int getNumberOfRooms() {
		return NumberOfRooms;
	}

	public void setNumberOfRooms(int numberOfRooms) {
		NumberOfRooms = numberOfRooms;
	}

	public int getNumberOfGuests() {
		return NumberOfGuests;
	}

	public void setNumberOfGuests(int numberOfGuests) {
		NumberOfGuests = numberOfGuests;
	}

	public Location getLocationOfApartment() {
		return LocationOfApartment;
	}

	public void setLocationOfApartment(Location locationOfApartment) {
		LocationOfApartment = locationOfApartment;
	}

	public Date getAvailableDatesForRent() {
		return AvailableDatesForRent;
	}

	public void setAvailableDatesForRent(Date availableDatesForRent) {
		AvailableDatesForRent = availableDatesForRent;
	}

	public Date getAvailability() {
		return Availability;
	}

	public void setAvailability(Date availability) {
		Availability = availability;
	}

	public Host getApartmentHost() {
		return ApartmentHost;
	}

	public void setApartmentHost(Host apartmentHost) {
		ApartmentHost = apartmentHost;
	}

	public Comment getPostedComments() {
		return PostedComments;
	}

	public void setPostedComments(Comment postedComments) {
		PostedComments = postedComments;
	}

	public double getPricePerStayingNight() {
		return PricePerStayingNight;
	}

	public void setPricePerStayingNight(double pricePerStayingNight) {
		PricePerStayingNight = pricePerStayingNight;
	}

	public Date getCheckInTime() {
		return CheckInTime;
	}

	public void setCheckInTime(Date checkInTime) {
		CheckInTime = checkInTime;
	}

	public Date getCheckOutTime() {
		return CheckOutTime;
	}

	public void setCheckOutTime(Date checkOutTime) {
		CheckOutTime = checkOutTime;
	}

	public boolean isActive() {
		return isActive;
	}

	public void setActive(boolean isActive) {
		this.isActive = isActive;
	}

	public ArrayList<Amenities> getAmenitiesList() {
		return AmenitiesList;
	}

	public void setAmenitiesList(ArrayList<Amenities> amenitiesList) {
		AmenitiesList = amenitiesList;
	}

	public ArrayList<Reservations> getListOfReservations() {
		return ListOfReservations;
	}

	public void setListOfReservations(ArrayList<Reservations> listOfReservations) {
		ListOfReservations = listOfReservations;
	}
	
}
