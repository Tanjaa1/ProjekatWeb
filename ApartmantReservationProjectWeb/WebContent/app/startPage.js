Vue.component("start-page", {	
	data: function(){
		return{
			reg:false,
			loginInformation:{}
		}
	},
	template: `
		<nav class="navbar navbar-expand-lg navbar-light bg-light">
			<a href="#" class="navbar-brand">Rezervacije<b>Apartmana</b></a>	
	
				<div class="navbar-nav action-buttons ml-auto">
					<a href="#" data-toggle="dropdown" class="nav-item nav-link dropdown-toggle mr-3">Prijavi se</a>
					<div class="dropdown-menu login-form">
						<form id="login">
							<div class="form-group">
								<input type="text" class="form-control"  placeholder="Korisničko ime" required="required" name="korisnicko_ime" v-model="loginInformation.username">
							</div>
							<div class="form-group">                      
								<input type="password" class="form-control" placeholder="Lozinka" required="required" name="lozinka" v-model="loginInformation.password">
							</div>
							<input type="submit" v-on:click="login(loginInformation)" value="Prijava">
						</form>					
					</div>	
					<a href="#" class="btn btn-primary" v-on:click="registracija()">Regustruj se</a>
				</div>
		</nav>
	`
	,
	methods:{
		login: function(loginInformation){
			alert(loginInformation.username);
			axios
				.get("rest/users/login", {params: {username:loginInformation.username,password:loginInformation.password}})
				.then(response => {
					if(this.user.username!=""){				
						alert("ULOGOVANI");
					}else{
						alert("Nije uspesno!");
					}
				} )
		},
		registracija: function(){
			alert("DADADAD");
			reg=true;
		}
	}	
});