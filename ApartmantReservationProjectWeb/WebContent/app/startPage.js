Vue.component("start-page", {	
data:{
	loginInformation:{}
},
template: `
	<nav class="navbar navbar-expand-lg navbar-light bg-light">
		<a href="#" class="navbar-brand">Rezervacije<b>Apartmana</b></a>	

			<div class="navbar-nav action-buttons ml-auto">
				<a href="#" data-toggle="dropdown" class="nav-item nav-link dropdown-toggle mr-3">Prijavi se</a>
				<div class="dropdown-menu login-form">
					<form id="login">
						<div class="form-group">
							<label>Korisničko ime</label>
							<input type="text" class="form-control" required="required" name="korisnicko_ime"  v-bind:value="username"
								  v-on:input="username = $event" >
						</div>
						<div class="form-group">
							<div class="clearfix">
								<label>Šifra</label>
							</div>                            
							<input type="password" class="form-control" required="required" name="lozinka" v-bind:value="password"
								  v-on:input="password = $event" >
						</div>
						<input type="submit" v-on:click="loginnn(loginInformation)" value="Prijava">
					</form>					
				</div>	
				<a href="#" class="btn btn-primary">Regustruj se</a>
			</div>
		</div>
	</nav>
`
,
methods:{
	loginnn: function(loginInformation){
		alert("proba");
		axios
			.get("/ApartmantReservationProjectWeb/rest/users/login", {params: {username:loginInformation.username,password:loginInformation.password}})
			.then(respones -> {
				alert("probaaaa");
				this.user=response.data;
				if(this.user!=""){
					alert(response.data.username);
				}else{
					alert("Nije uspesno!");
				}
			} )
	}
}
	
});