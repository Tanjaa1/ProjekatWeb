Vue.component("user-info", {	
	data: function(){
		return{
			currentUser:null,
			kime:"",
			bool:true
		}
	},	
	beforeMount(){
		axios
		.get("rest/users/currentUser")
		.then(response=>{
			if(response.data.role==undefined){
					this.$router.push('forbidden');
			}else{
				var ime=document.getElementById("ime"),prezime=document.getElementById("prezime"),pol="";
				
				document.getElementById("sacuvaj").className="search-btn-dis";
				document.getElementById("otkazi").className="search-btn-dis";
					this.currentUser=response.data;
					this.kime=response.data.username;
					ime.value=response.data.name;
					prezime.value=response.data.surname;
					if(response.data.gender=="Male")
						document.getElementById("radio1").checked=true;
					else
						document.getElementById("radio2").checked=true;
			}
		})
	},
template: `
<div class="container">
	<ul class="nav nav-tabs" role="tablist">
    	<li class="nav-item">
    		<a class="nav-link active" data-toggle="tab" href="#profil">Profil</a>
    	</li>
    	<li class="nav-item">
    		<a class="nav-link" data-toggle="tab" href="#lozinka">Promeni lozinku</a>
    	</li>
    </ul>
    <!-- Tab panes -->
    <div class="tab-content">
    	<div id="profil" class="container tab-pane active"><br>
    		<h3>Podaci o korisniku {{kime}}:</h3>
    		<div class="form-group">	
    			<label>Ime:</label>
    			<input id="ime" type="text" class="form-control" placeholder="Ime *" value="" disabled="disabled"/>
    			<span id="nemaIme" style="color:red; visibility:hidden"></span>
    		</div>
    		<div class="form-group">
				<label>Prezime:</label>
				<input id="prezime" type="text" class="form-control" placeholder="Prezime *" value="" disabled="disabled"/>
				<span id="nemaPrez" style="color:red; visibility:hidden"></span>
			</div>
			<div class="form-group">
				<label>Pol:</label>
				<div class="maxl">
		            <label class="radio inline"> 
		                <input id="radio1" type="radio" name="gender" value="male" disabled="disabled">
		                <span> Muško </span> 
		            </label>
		            <label class="radio inline"> 
		                <input id="radio2" type="radio" name="gender" value="female" disabled="disabled"/>
		                <span>Žensko </span> 
		            </label>
		         </div>
		         <span id="nemaPol" style="color:red; visibility:hidden"> Morate odabrati pol!</span><br>
		         <button id="izmeni" type="button" class="search-btn" v-on:click="Izmeni()">Izmeni podatke</button>
		         <button  id="sacuvaj" type="button" disabled="disabled" class="search-btn" v-on:click="Sacuvaj()" >Potvrdi izmenu</button>
		         <button  id="otkazi" type="button" disabled="disabled" class="search-btn" v-on:click="Otkazi()" >Otkaži izmenu</button>
		         <br/> <br/>
		         <p align="right">
		         <button id="obrisi" type="button" class="search-btn" v-on:click="Obrisi()">Obriši profil</button>
		         </p>
		         </div>				     
		  </div>
		  <div id="lozinka" class="container tab-pane fade"><br>
		  	<div class="form-group">
		   		<label>Stara lozinka:</label>
				<input id="passOld" type="password" class="form-control" placeholder="Lozinka *" value=""/>
				<span id="nemaPassOld" style="color:red; visibility:hidden"> Morate uneti staru lozinku!</span>
			</div>
			<div class="form-group">
				<label>Nova lozinka:</label>
				<input id="passNew" type="password" class="form-control"  placeholder="Potvrda lozinke*" value="" />
				<span id="nemaPassNew" style="color:red; visibility:hidden"></span>
			</div>
			<div class="form-group">
				<label>Potvrdi lozinku:</label>
				<input id="passC" type="password" class="form-control"  placeholder="Potvrda lozinke*" value="" />
				<span id="nemaPassC" style="color:red; visibility:hidden"></span>
			</div>				
			<button id="sacuvajLozinku" type="button" class="search-btn" v-on:click="SacuvajLozinku()">Potvrdi izmenu</button>
		</div>
	</div>
</div>
`,
methods:{
	Izmeni: function(){
		document.getElementById("izmeni").className="search-btn-dis";
		document.getElementById("sacuvaj").className="search-btn";
		document.getElementById("sacuvaj").disabled=false;
		document.getElementById("otkazi").className="search-btn";
		document.getElementById("otkazi").disabled=false;
		document.getElementById("izmeni").disabled=true;
		document.getElementById("ime").disabled=false;
		document.getElementById("prezime").disabled=false;
		document.getElementById("radio1").disabled=false;
		document.getElementById("radio2").disabled=false;
	},
	Sacuvaj: function(currentUser){
		this.bool=false;
		var ime=document.getElementById("ime"),prezime=document.getElementById("prezime"),pol="";		
		
		if(!document.getElementById("radio1").checked && document.getElementById("radio2").checked)
			pol=document.getElementById("radio1").value;
		else if(document.getElementById("radio1").checked && !document.getElementById("radio2").checked)
			pol=document.getElementById("radio2").value;
		if(ime.value!="" && prezime.value!="" && pol!="" && ime.value.length>1 && prezime.value.length>1){
			this.bool=true;
			var info=ime.value+";"+prezime.value+";"+pol;
			axios
			.get("rest/users/update",{params:{info: info}})
			.then(response => {	
			} )

			ime.style.borderColor ="grey";
			document.getElementById("nemaIme").style.visibility = "hidden";
			prezime.style.borderColor ="grey";
			document.getElementById("nemaPrez").style.visibility = "hidden";
			document.getElementById("nemaPol").style.visibility = "hidden";
		}else{
			if(ime.value==""){
				ime.style.borderColor ="red";
				document.getElementById("nemaIme").style.visibility = "visible";
				document.getElementById("nemaIme").innerHTML="Morate uneti ime!";
			}else if(ime.value.length<2){
				ime.style.borderColor ="red";
				document.getElementById("nemaIme").style.visibility = "visible";
				document.getElementById("nemaIme").innerHTML="Ime mora sadržati bar 2 znaka!";
			}else{
				ime.style.borderColor ="grey";
				document.getElementById("nemaIme").style.visibility = "hidden";
			}
			if(prezime.value==""){
				prezime.style.borderColor ="red";
				document.getElementById("nemaPrez").style.visibility = "visible";
				document.getElementById("nemaPrez").innerHTML="Morate uneti prezime!";
			}else if(prezime.value.length<2){
				ime.style.borderColor ="red";
				document.getElementById("nemaPrez").style.visibility = "visible";
				document.getElementById("nemaPrez").innerHTML="Prezime mora sadržati bar 2 znaka!";
			}else{
				prezime.style.borderColor ="grey";
				document.getElementById("nemaPrez").style.visibility = "hidden";
			}
			if(pol=="")
				document.getElementById("nemaPol").style.visibility = "visible";
			else
				document.getElementById("nemaPol").style.visibility = "hidden";

			
			
		}
		this.prikaz();
	},
	Otkazi : function(){
		var ime=document.getElementById("ime"),prezime=document.getElementById("prezime"),pol="";
		
		document.getElementById("sacuvaj").className="search-btn-dis";
		document.getElementById("otkazi").className="search-btn-dis";
		this.kime=this.currentUser.username;
		ime.value=this.currentUser.name;
		prezime.value=this.currentUser.surname;
		if(this.currentUser.gender=="Male")
			document.getElementById("radio1").checked=true;
		else
			document.getElementById("radio2").checked=true;
		this.bool=true;
		ime.style.borderColor ="grey";
		document.getElementById("nemaIme").style.visibility = "hidden";
		prezime.style.borderColor ="grey";
		document.getElementById("nemaPrez").style.visibility = "hidden";
		document.getElementById("nemaPol").style.visibility = "hidden";
		this.prikaz();
	},
	SacuvajLozinku: function(){
		var stara_lozinka=document.getElementById("passOld"),nova_lozinka=document.getElementById("passNew"),kontrolna_lozinka=document.getElementById("passC");
		if(stara_lozinka.value=="" || stara_lozinka.value!=this.currentUser.password){
			stara_lozinka.style.borderColor ="red";
			document.getElementById("nemaPassOld").style.visibility = "visible";
		}else{
			stara_lozinka.style.borderColor ="grey";
			document.getElementById("nemaPassOld").style.visibility = "hidden";
		}
		if(nova_lozinka.value==""){
			nova_lozinka.style.borderColor ="red";
			document.getElementById("nemaPassNew").style.visibility = "visible";
			document.getElementById("nemaPassNew").innerHTML="Morate uneti novu lozinku!";
		}else if(nova_lozinka.value.length<5){
			ime.style.borderColor ="red";
			document.getElementById("nemaPassNew").style.visibility = "visible";
			document.getElementById("nemaPassNew").innerHTML="Lozinka mora sadržati bar 5 znakova!";
		}else{
			nova_lozinka.style.borderColor ="grey";
			document.getElementById("nemaPassNew").style.visibility = "hidden";
		}
		if(kontrolna_lozinka.value==""){
			kontrolna_lozinka.style.borderColor ="red";
			document.getElementById("nemaPassC").style.visibility = "visible";
			document.getElementById("nemaPassC").innerHTML="Morate uneti kontrolnu lozinku!";
		}else{
			if(nova_lozinka.value!=kontrolna_lozinka.value){
				lozinka.style.borderColor ="red";
				document.getElementById("nemaPassC").style.visibility = "visible";
				document.getElementById("nemaPassC").innerHTML="Lozinke se ne poklapaju!";
			}else{
				kontrolna_lozinka.style.borderColor ="grey";
				document.getElementById("nemaPassC").style.visibility = "hidden";
				if(stara_lozinka.value==this.currentUser.password && nova_lozinka.value.length>4){
					var nl=nova_lozinka.value;
						axios
						.get("rest/users/update",{params:{info: nl}})
						.then(response => {
							alert("Lozinka je uspešno promenjena");
						} )
				}
			}
		}
	},
	prikaz: function(){
		if(this.bool){
			document.getElementById("izmeni").className="search-btn";
			document.getElementById("sacuvaj").className="search-btn-dis";
			document.getElementById("otkazi").className="search-btn-dis";
			document.getElementById("sacuvajLozinku").className="search-btn";
			
			document.getElementById("sacuvaj").disabled=true;
			document.getElementById("otkazi").disabled=true;
			document.getElementById("izmeni").disabled=false;
			document.getElementById("ime").disabled=true;
			document.getElementById("prezime").disabled=true;
			document.getElementById("radio1").disabled=true;
			document.getElementById("radio2").disabled=true;
		}
	},
	Obrisi: function(){
		axios
		.get("rest/users/delete")
		.then(response => {
			alert("Profil je uspesno obrisan!");
			app.Odjava()
		} )
	}
}
});