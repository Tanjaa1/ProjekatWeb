package beans;

import java.util.ArrayList;
import java.util.List;

public class Host extends User implements IIdentifiable<String>{
	
	public List<Apartment> ApartmentsForRent;
	
	public Host() {
		super();
		Role = Roles.Host;
		ApartmentsForRent = new ArrayList<Apartment>();
	}

	public List<Apartment> getApartmentsForRent() {
		return ApartmentsForRent;
	}

	public void setApartmentsForRent(ArrayList<Apartment> apartmentsForRent) {
		ApartmentsForRent = apartmentsForRent;
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
