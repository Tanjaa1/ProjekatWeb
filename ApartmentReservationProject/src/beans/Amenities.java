package beans;

public class Amenities implements IIdentifiable<Long>{

	private long Id;
	public String AmenitiesName;
	
	
	public Amenities() {}

	public Amenities(String amenitiesName) {
		super();
		AmenitiesName = amenitiesName;
	}
	

	public String getAmenitiesName() {
		return AmenitiesName;
	}

	public void setAmenitiesName(String amenitiesName) {
		AmenitiesName = amenitiesName;
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
