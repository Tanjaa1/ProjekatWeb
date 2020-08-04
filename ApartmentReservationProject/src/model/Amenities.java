package model;

public class Amenities {

	public String AmenitiesId;
	public String AmenitiesName;
	
	
	public Amenities() {}

	public Amenities(String amenitiesId, String amenitiesName) {
		super();
		AmenitiesId = amenitiesId;
		AmenitiesName = amenitiesName;
	}
	

	public String getAmenitiesId() {
		return AmenitiesId;
	}

	public void setAmenitiesId(String amenitiesId) {
		AmenitiesId = amenitiesId;
	}

	public String getAmenitiesName() {
		return AmenitiesName;
	}

	public void setAmenitiesName(String amenitiesName) {
		AmenitiesName = amenitiesName;
	}
	
}
