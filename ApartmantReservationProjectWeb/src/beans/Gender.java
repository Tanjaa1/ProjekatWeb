package beans;


public enum Gender {
	Male(0), 
	Female(1);
	private int Gender;
	
	Gender(){
		Gender=0;
	}
	Gender(int g){
		Gender=g;
	}
    public int getGender() {
        return Gender;
    }

    public void setGender(int g) {
    	Gender = g;
    }
	public static Gender getGenderS(String str){
		if(str.equals("male"))
			return Male;
		else if(str.equals("female"))
			return Female;
		return null;
	}
}
