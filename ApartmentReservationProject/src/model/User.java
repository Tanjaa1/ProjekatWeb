package model;

public class User {
	
	public String Username;
	public String Password;
	public String Name;
	public String Surname;	
	
	
	public User() { }

	public User(String username, String password, String name, String surname) {
		super();
		Username = username;
		Password = password;
		Name = name;
		Surname = surname;
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
	
}
