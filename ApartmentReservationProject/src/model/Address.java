package model;

public class Address {
	
	public String Street;
	public int StreetNumber;
	public String City;
	public int PostalCode;
	
	
	public Address() {}

	public Address(String street, int streetNumber, String city, int postalCode) {
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

	public int getStreetNumber() {
		return StreetNumber;
	}

	public void setStreetNumber(int streetNumber) {
		StreetNumber = streetNumber;
	}

	public String getCity() {
		return City;
	}

	public void setCity(String city) {
		City = city;
	}

	public int getPostalCode() {
		return PostalCode;
	}

	public void setPostalCode(int postalCode) {
		PostalCode = postalCode;
	}

}
