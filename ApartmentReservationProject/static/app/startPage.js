Vue.component("start-page", {
	data: 	function login() {
			var $form = $("#login");
			var data = getFormData($form);
			var s = JSON.stringify(data);
			$.ajax({
				url: "login",
				type:"POST",
				data: s,
				contentType:"application/json",
				dataType:"json",
				complete: function(data) {
					$( "#resultLogin" ).html( data.responseText );
				}
			});
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
							<input type="text" class="form-control" required="required" name="korisnicko_ime">
						</div>
						<div class="form-group">
							<div class="clearfix">
								<label>Šifra</label>
							</div>                            
							<input type="password" class="form-control" required="required" name="lozinka">
						</div>
						<input type="submit" onclick="login()" value="Prijava">
					</form>					
				</div>	
				<a href="#" class="btn btn-primary">Regustruj se</a>
			</div>
		</div>
	</nav>		  
`
	
});