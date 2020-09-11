package beans;

public class Address implements IIdentifiable<Long>, IDelete{
	
	private long Id;
	protected boolean Deleted = false;
	public String Street;
	public String StreetNumber;
	public String City;
	public String PostalCode;
	
	
	public Address() {}

	public Address(String street, String streetNumber, String city, String postalCode) {
		super();
		Street = street;
		StreetNumber = streetNumber;
		City = city;
		PostalCode = postalCode;
	}

	
	public String getStreet() {
		return Street;
	}

	public void setStreet(String street) {
		Street = street;
	}

	public String getStreetNumber() {
		return StreetNumber;
	}

	public void setStreetNumber(String streetNumber) {
		StreetNumber = streetNumber;
	}

	public String getCity() {
		return City;
	}

	public void setCity(String city) {
		City = city;
	}

	public String getPostalCode() {
		return PostalCode;
	}

	public void setPostalCode(String postalCode) {
		PostalCode = postalCode;
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
