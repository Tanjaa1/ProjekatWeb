package beans;

public class Amenities implements IIdentifiable<Long>, IDelete{

	private long Id;
	private boolean Deleted = false;
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

	@Override
	public boolean getDeleted() {
		return Deleted;
	}

	@Override
	public void setDeleted(boolean b) {
		Deleted = b;		
	}
	
	
	
}
