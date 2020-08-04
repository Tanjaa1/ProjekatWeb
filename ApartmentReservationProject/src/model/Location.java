package model;

public class Location extends Address {

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
	
}
