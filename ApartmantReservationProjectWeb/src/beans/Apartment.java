package beans;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class Apartment implements IIdentifiable<Long>, IDelete{
	
	private long Id;
	private boolean Deleted = false;
	public String NameOfApartment;
	public ApartmentType Type;
	public int NumberOfRooms;
	public int NumberOfGuests;
	public Location LocationOfApartment;
	public Address ApartmentAddress;
	public List<Date> AvailableDatesForRent;
	public List<Date> AvailableDates;
	public Host ApartmentHost;
	public Comment PostedComments;
	public double PricePerStayingNight;
	public Date CheckInTime;
	public Date CheckOutTime;
	public boolean isActive; //status => aktivno = true; neaktivno = false
	public List<Amenities> AmenitiesList;
	public List<Reservations> ListOfReservations;
	
	
	public Apartment() { }	
		
	public Apartment(String nameOfApartment, ApartmentType type, int numberOfRooms, int numberOfGuests, Location locationOfApartment, Address address, Host apartmentHost, Comment postedComments, double pricePerStayingNight,
			Date checkInTime, Date checkOutTime, boolean isActive) {
		super();
		NameOfApartment = nameOfApartment;
		Type = type;
		NumberOfRooms = numberOfRooms;
		NumberOfGuests = numberOfGuests;
		LocationOfApartment = locationOfApartment;
		ApartmentAddress = address;
		AvailableDatesForRent = new ArrayList<Date>();
		AvailableDates = new ArrayList<Date>();
		ApartmentHost = apartmentHost;
		PostedComments = postedComments;
		PricePerStayingNight = pricePerStayingNight;
		CheckInTime = checkInTime;
		CheckOutTime = checkOutTime;
		this.isActive = isActive;
		AmenitiesList = new ArrayList<Amenities>();
		ListOfReservations = new ArrayList<Reservations>();
	}
	
	public String getNameOfApartment() {
		return NameOfApartment;
	}

	public void setNameOfApartment(String nameOfApartment) {
		NameOfApartment = nameOfApartment;
	}

	public ApartmentType getType() {
		return Type;
	}

	public void setType(ApartmentType type) {
		Type = type;
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
	
	public Address getApartmentAddress() {
		return ApartmentAddress;
	}

	public void setApartmentAddress(Address apartmentAddress) {
		ApartmentAddress = apartmentAddress;
	}

	public Location getLocationOfApartment() {
		return LocationOfApartment;
	}

	public void setLocationOfApartment(Location locationOfApartment) {
		LocationOfApartment = locationOfApartment;
	}

	public List<Date> getAvailableDatesForRent() {
		return AvailableDatesForRent;
	}

	public void setAvailableDatesForRent(List<Date> availableDatesForRent) {
		AvailableDatesForRent = availableDatesForRent;
	}

	public List<Date> getAvailableDates() {
		return AvailableDates;
	}

	public void setAvailableDates(List<Date> availableDates) {
		AvailableDates = availableDates;
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

	public List<Amenities> getAmenitiesList() {
		return AmenitiesList;
	}

	public void setAmenitiesList(List<Amenities> amenitiesList) {
		AmenitiesList = amenitiesList;
	}

	public List<Reservations> getListOfReservations() {
		return ListOfReservations;
	}

	public void setListOfReservations(List<Reservations> listOfReservations) {
		ListOfReservations = listOfReservations;
	}

	@Override
	public Long getId() {
		return Id;
	}

	@Override
	public void setId(Long id) {
		Id = id;		
	}

	@Override
	public boolean getDeleted() {
		return Deleted;
	}

	@Override
	public void setDeleted(boolean b) {
		Deleted=b;
	}
	
}
