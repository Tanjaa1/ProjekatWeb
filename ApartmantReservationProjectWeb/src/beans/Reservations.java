package beans;

import java.util.Date;

public class Reservations implements IIdentifiable<Long>, IDelete{
	
	private long Id;
	private boolean Deleted = false;
	public Apartment ReservatedApartment;
	public Date StartDate;
	public int NumberOfStayingNights;
	public double TotalPrise;
	public String Message;
	public User GuestWhoStays;
	public ReservationStatus Status;
	
	
	public Reservations() {	}

	public Reservations(Apartment reservatedApartment, Date startDate, int numberOfStayingNights, double totalPrise,
			String message, Guest guestWhoStays, ReservationStatus status) {
		super();
		ReservatedApartment = reservatedApartment;
		StartDate = startDate;
		NumberOfStayingNights = numberOfStayingNights;
		TotalPrise = totalPrise;
		Message = message;
		GuestWhoStays = guestWhoStays;
		Status = status;
	}
	

	public Apartment getReservatedApartment() {
		return ReservatedApartment;
	}

	public void setReservatedApartment(Apartment reservatedApartment) {
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

	public User getGuestWhoStays() {
		return GuestWhoStays;
	}

	public void setGuestWhoStays(User guestWhoStays) {
		GuestWhoStays = guestWhoStays;
	}

	public ReservationStatus getStatus() {
		return Status;
	}
	public String getStatusS(){
		if(Status==ReservationStatus.DropedOut)
			return "DropedOut";
		else if(Status==ReservationStatus.Created)
			return "Created";
		else if(Status==ReservationStatus.Accepted)
			return "Accepted";
		else if(Status==ReservationStatus.Finalized)
			return "Finalized";
		else
			return "Rejected";
	}
	public void setStatus(ReservationStatus status) {
		Status = status;
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
		Deleted = b;
	}
	
	
}
