package beans;

public class Comment implements IIdentifiable<Long> {
	
	private long Id;
	public Apartment CommentedApartment;
	public Guest GuestWhoCommented;
	public String CommentContent;
	public double ApartmentGrade;
	
	
	public Comment() {}

	public Comment(Apartment commentedApartment, Guest guestWhoCommented, String commentContent,
			double apartmentGrade) {
		super();
		CommentedApartment = commentedApartment;
		GuestWhoCommented = guestWhoCommented;
		CommentContent = commentContent;
		ApartmentGrade = apartmentGrade;
	}
	

	public Apartment getCommentedApartment() {
		return CommentedApartment;
	}

	public void setCommentedApartment(Apartment commentedApartment) {
		CommentedApartment = commentedApartment;
	}

	public Guest getGuestWhoCommented() {
		return GuestWhoCommented;
	}

	public void setGuestWhoCommented(Guest guestWhoCommented) {
		GuestWhoCommented = guestWhoCommented;
	}

	public String getCommentContent() {
		return CommentContent;
	}

	public void setCommentContent(String commentContent) {
		CommentContent = commentContent;
	}

	public double getApartmentGrade() {
		return ApartmentGrade;
	}

	public void setApartmentGrade(double apartmentGrade) {
		ApartmentGrade = apartmentGrade;
	}

	@Override
	public Long getId() {
		return Id;
	}

	@Override
	public void setId(Long id) {
		Id = id;		
	}	
	
}
