package beans;

public enum Gender {
	Male, 
	Female;
	
	Gender(){}
	public static Gender getGender(String str){
		if(str.equals("male"))
			return Gender.Male;
		else if(str.equals("female"))
			return Gender.Female;
		return null;
	}
}
