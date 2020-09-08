package beans;


public enum Roles {
	Administrator, 
	Guest, 
	Host;

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
