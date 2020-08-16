package beans;

public class Location extends Address implements IIdentifiable<Long>{

	private long LocationId;
	public double Longitude;
	public double Latitude;
	
	
	public Location() {	}


	public Location(double longitude, double latitude) {
		super();
		Longitude = longitude;
		Latitude = latitude;
	}


	public double getLongitude() {
		return Longitude;
	}


	public void setLongitude(double longitude) {
		Longitude = longitude;
	}


	public double getLatitude() {
		return Latitude;
	}


	public void setLatitude(double latitude) {
		Latitude = latitude;
	}


	@Override
	public Long getId() {
		return LocationId;
	}


	@Override
	public void setId(Long id) {
		LocationId = id;
	}
	
}
