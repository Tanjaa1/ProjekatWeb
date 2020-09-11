package beans;

public class User implements IIdentifiable<String>, IDelete{
	
	private boolean Deleted = false;
	public String Username;
	public String Password;
	public String Name;
	public String Surname;	
	public Roles Role;
	public Gender Gender;
	public String Block;
	
	public User() { }

	public User(String username, String password) {
		super();
		Username = username;
		Password = password;
		Block="no";
	}

	
	public User(String username, String password, String name, String surname, Roles role, Gender gender) {
		super();
		Username = username;
		Password = password;
		Name = name;
		Surname = surname;
		Role = role;
		Gender = gender;
		Block="no";
	}

	public User(String username, String password, String name, String surname,Gender gender) {
		super();
		Username = username;
		Password = password;
		Name = name;
		Surname = surname;
		Gender=gender;
		Role=Roles.Host;
		Block="no";
	}
	public String getUsername() {
		return Username;
	}

	public void setUsername(String username) {
		Username = username;
	}

	public String getPassword() {
		return Password;
	}

	public void setPassword(String password) {
		Password = password;
	}

	public String getName() {
		return Name;
	}

	public void setName(String name) {
		Name = name;
	}

	public String getSurname() {
		return Surname;
	}

	public void setSurname(String surname) {
		Surname = surname;
	}
	
	public Roles getRole() {
		return Role;
	}
	public String getRoleString() {
		if(Role.getRole()==0)
			return "Administrator";
		else if(Role.getRole()==1)
			return "Guest";
		else
			return "Host";
	}
	public void setRole(Roles role) {
		Role = role;
	}

	public Gender getGender() {
		return Gender;
	}
	public String getGenderString() {
		if(Gender.getGender()==0)
			return "Male";
		else
			return "Female";
	}
	public void setGender(Gender gender) {
		Gender=gender;
	}
	
	public String getBlock(){
		return Block;
	}
	
	public void setBlock(String block){
		Block=block;
	}
	@Override
	public String getId() {
		return Username;
	}

	@Override
	public void setId(String id) {
		setUsername(id);
		
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
