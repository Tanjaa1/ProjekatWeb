package model;

import java.util.ArrayList;

public class Host extends User {
	
	public ArrayList<Apartment> ApartmentsForRent;
	
	public Host() {
		super();
		ApartmentsForRent = new ArrayList<Apartment>();
	}

	public ArrayList<Apartment> getApartmentsForRent() {
		return ApartmentsForRent;
	}

	public void setApartmentsForRent(ArrayList<Apartment> apartmentsForRent) {
		ApartmentsForRent = apartmentsForRent;
	}
	
}
