Vue.component("reg-page", {	
	data: function(){
		return{
			regInformation:{}
		}
	},
	template: `
<div class="header" >
	<form>
		<h1>
			Registracija
		</h1>
		<div class="form-box">
			<div class="form-group">
				<input id="ime" type="text" class="form-control" placeholder="Ime *" value="" v-model="regInformation.name"/>
				<span id="nemaIme" style="color:red; visibility:hidden"> Morate uneti ime!</span>
			</div>
			<div class="form-group">
				<input id="prezime" type="text" class="form-control" placeholder="Prezime *" value=""  v-model="regInformation.surname"/>
				<span id="nemaPrez" style="color:red; visibility:hidden"> Morate uneti prezime!</span>
			</div>
			<div class="form-group">
				<input id="kime" type="text" class="form-control" placeholder="Korisničko ime *" value="" v-model="regInformation.username"/>
				<span id="nemaKIme" style="color:red; visibility:hidden"> Morate uneti korisničko ime!</span>
			</div>
			<div class="form-group">
				<input id="pass" type="password" class="form-control" placeholder="Lozinka *" value="" v-model="regInformation.password"/>
				<span id="nemaPass" style="color:red; visibility:hidden"> Morate uneti lozinku!</span>
			</div>
			<div class="form-group">
				<input id="passC" type="password" class="form-control"  placeholder="Potvrda lozinke*" value="" v-model="regInformation.passwordControl"/>
				<span id="nemaPassC" style="color:red; visibility:hidden"> Morate potvrditi lozinku!</span>
			</div>
			<div class="form-group" style="color:white">
				<div class="maxl">
		            <label class="radio inline"> 
		                <input type="radio" name="gender" value="male" v-model="regInformation.gender">
		                <span> Muško </span> 
		            </label>
		            <label class="radio inline"> 
		                <input type="radio" name="gender" value="female" v-model="regInformation.gender"/>
		                <span>Žensko </span> 
		            </label>
		         </div>
		         <span id="nemaPol" style="color:red; visibility:hidden"> Morate odabrati pol!</span>
		     </div>
		     <button type="button" class="search-btn" v-on:click="registracija(regInformation)">Registruj se</button>
		 </div>
	</form>
</div>
`,
methods:{
	registracija: function(regInformation){
		var ime=document.getElementById("ime"), prezime=document.getElementById("prezime"),korisnicko_ime=document.getElementById("kime"),lozinka=document.getElementById("pass"),kontrolna_lozinka=document.getElementById("passC");
		if(ime.value==""){
			ime.style.borderColor ="red";
			document.getElementById("nemaIme").style.visibility = "visible";
		}else{
			ime.style.borderColor="white";
			document.getElementById("nemaIme").style.visibility = "hidden";
		}
		if(prezime.value==""){
			prezime.style.borderColor ="red";
			document.getElementById("nemaPrez").style.visibility = "visible";
		}else{
			prezime.style.borderColor ="white";
			document.getElementById("nemaPrez").style.visibility = "hidden";
		}
		if(korisnicko_ime.value==""){
			korisnicko_ime.style.borderColor ="red";
			document.getElementById("nemaKIme").style.visibility = "visible";
		}else{
			korisnicko_ime.style.borderColor="white";
			document.getElementById("nemaKIme").style.visibility = "hidden";
		}
		if(lozinka.value==""){
			lozinka.style.borderColor ="red";
			document.getElementById("nemaPass").style.visibility = "visible";
		}else{
			lozinka.style.borderColor ="white";
			document.getElementById("nemaPass").style.visibility = "hidden";
		}
		if(kontrolna_lozinka.value==""){
			lozinka.style.borderColor ="red";
			document.getElementById("nemaPassC").style.visibility = "visible";
		}else{
			if(lozinka.value!=kontrolna_lozinka.value){
				lozinka.style.borderColor ="red";
				document.getElementById("nemaPassC").style.visibility = "visible";
				document.getElementById("nemaPassC").innerHTML="Lozinke se ne poklapaju!";
			}else{
				kontrolna_lozinka.style.borderColor ="white";
				document.getElementById("nemaPassC").style.visibility = "hidden";
			}
		}
		if(this.regInformation.gender==null){
			document.getElementById("nemaPol").style.visibility = "visible";
		}else{
			document.getElementById("nemaPol").style.visibility = "hidden";
		}
		if(ime.value!="" && prezime.value!="" && korisnicko_ime!="" && lozinka!="" && this.regInformation.gender!=null){		
			//var user = {username : regInformation.username, password : regInformation.password, name : regInformation.name, surname : regInformation.surname};
			axios
				.post("rest/users/add",regInformation,{params : {gender:regInformation.gender}})
				.then(response => {
					if(response.data=="Već postoji"){
						korisnicko_ime.style.borderColor ="red";
						document.getElementById("nemaKIme").innerHTML = "Korisničko ime postoji!";
					}
				})
		}
	}
}
});