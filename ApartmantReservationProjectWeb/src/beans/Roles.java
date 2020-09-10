package beans;


public enum Roles {
	Administrator(0), 
	Guest(1), 
	Host(2);
	private int Role;
	
	Roles(){
		Role=1;
	}
	Roles(int r){
		Role=r;
	}
    public int getRole() {
        return Role;
    }

    public void setRole(int role) {
        Role = role;
    }
	public Roles getRole(String role) {
		if(role.equals("Administrator"))
			return Roles.Administrator;
		else if(role.equals("Guest"))
			return Roles.Guest;
		else if(role.equals("Host"))
			return Roles.Host;
		return null;
	}
	

}

