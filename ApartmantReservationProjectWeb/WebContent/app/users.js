Vue.component("users", {	
	data: function(){
		return{
			users:null,
			selectedUser:{},
			can:false,
			can1:false,
			can2:false,
			res:''
		}
	},
	beforeMount(){
		axios
		.get("rest/users/getRole")
		.then(response=>{
			if(response.data=="Guest"){
				this.$router.push('forbidden');
			}
		})
	},
	template: `
	<div class="tabelaa">
	<br>
	<section class="search-sec">
    <div class="container">
        <form action="#" >
            <div class="row">
            <div class="col-lg-3 col-md-3 col-sm-12 p-1">
            <a>Pretraži korisnike po parametrima:</a>
        </div>
                <div class="col-lg-12">
                    <div class="row">
                        <div class="col-lg-3 col-md-3 col-sm-12 p-1">
                            <input id="kime_p" class="form-control search-slt" value="" placeholder="Korisničko ime"/>
                        </div>
                        <div class="col-lg-3 col-md-3 col-sm-12 p-1">
                        <select class="form-control search-slt" id="pol_p">
                        <option>Pol</option>
                        <option>Muško</option>
                        <option>Žensko</option>
                     </select>
                        </div>
                         <div class="col-lg-3 col-md-3 col-sm-12 p-1">
                          <select class="form-control search-slt" id="uloga_p">
	                          <option>Uloga</option>
	                          <option>Administrator</option>
	                          <option>Domaćin</option>
	                          <option>Gost</option>
	                       </select>
                        </div>
                        <div class="col-lg-3 col-md-3 col-sm-12 p-2">
                            <button type="button" style="backgroundColor:#5c6ac4" v-on:click="pretrazi"><i class="fas fa-search"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</section>
<br>
	<table id="table" class="table table-bordered" border="1">
	<tr>
		<th class="bg-light" colspan="6" style="text-align:center"><h1><b>Korisnici</b></h1></th>
	</tr>
	<tr class="bg-light">
		<th><b>Korisničko ime</b></th>
		<th><b>Ime</b></th>
		<th><b>Prezime</b></th>
		<th><b>Pol</b></th>
		<th><b>Uloga</b></th>
		<th><b>Blokiran</b></th>
	</tr>
		
	<tr v-for="u in users" v-on:click="selectUser(u)" v-bind:class="{selected : selectedUser.username===u.username}">
		<td>{{u.username }}</td>
		<td>{{u.name}}</td>
		<td>{{u.surname}}</td>
		<td v-if="u.gender=='Male'">Muški</td>
		<td v-if="u.gender!='Male'">Ženski</td>
		<td v-if="u.role=='Administrator'">{{u.role}}</td>
		<td v-if="u.role=='Guest'">Gost</td>
		<td v-if="u.role=='Host'">Domaćin</td>
		<td v-if="u.block=='no'">ne</td>
		<td v-if="u.block!='no'">da</td>
	</tr>
</table>

<button v-on:click="blokiraj()" v-bind:disabled="!can1" class="btn btn-primary">Blokiraj korisnika</button>&nbsp
<button v-on:click="odblokiraj()" v-bind:disabled="!can2" class="btn btn-primary">Odblokiraj korisnika</button>
<br/><br/>
<button  v-bind:disabled="!can" v-on:click="obrisi()" class="btn btn-primary">Obrisi korisnika</button>&nbsp
<button v-on:click="dodaj()" onclick="location.href='#/reg'" class="btn btn-primary">Registruj domaćina</button>
</div>		  
`,
methods:{
	pretrazi: function(){
		var pol=" ",uloga=" ";
		if(document.getElementById("pol_p").value=="Muško")
			pol="Male";
		else if(document.getElementById("pol_p").value=="Žensko")
			pol="Female";
		
		if(document.getElementById("uloga_p").value=="Administrator")
			uloga="Administrator";
		else if(document.getElementById("uloga_p").value=="Gost")
			uloga="Guest";
		else if(document.getElementById("uloga_p").value=="Domaćin")
			uloga="Host";
		
		var search=document.getElementById("kime_p").value+";"+pol+";"+uloga;
	    axios
	    .get('rest/admin/search',{params :{search: search}})
	    .then(response => {
	    	this.users = response.data;
	    	})
	},
	selectUser : function(user) {
		this.selectedUser = user;
		if(user.role!="Administrator"){
			if(user.block=="yes"){
				this.can2=true;
				this.can1=false;
			}else{
				this.can2=false;	
				this.can1=true;
			}
			this.can=true;
		}
	},
	blokiraj: function(){
		
	    axios
	    .get("rest/admin/block",{params:{username: this.selectedUser.username,password:this.selectedUser.password}})
	    .then(response =>{
			this.can2=true;
			this.can1=false;
	    	alert("Blokirali ste korisnika");
	    })
	    this.refresh();
	},
	odblokiraj: function(){

	    axios
	    .get("rest/admin/unblock",{params:{username: this.selectedUser.username,password:this.selectedUser.password}})
	    .then(response =>{
			this.can1=true;
			this.can2=false;
	    	alert("Odblokirali ste korisnika");
	    })
	    this.refresh();
	},
	obrisi: function(){
	    axios
		    .get("rest/admin/delete",{params:{username: this.selectedUser.username}})
		    .then(response =>{
		    	alert("Obrisali ste korisnika");
	    })
	    this.refresh();
	},
	refresh: function(){
	     axios
		    .get('rest/admin/search',{params :{search: ""}})
		    .then(response => {
		    	this.users = response.data;
		    })
	}
},
mounted() {
	var search="";
    axios
    .get('rest/admin/search',{params :{search: search}})
    .then(response => {
    	this.users = response.data;
    	})
}
});