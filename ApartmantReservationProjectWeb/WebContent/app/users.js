Vue.component("users", {	
	data: function(){
		return{
			users:null
		}
	},
	template: `
	<div>
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
		<th class="bg-light" colspan="6" style="text-align:center"><h1><b>Korisnici<b></h1></th>
	</tr>
	<tr class="bg-light">
		<td><b>Korisničko ime</b></th>
		<td><b>Ime</b></th>
		<td><b>Prezime</b></th>
		<td><b>Pol</b></th>
		<td><b>Uloga</b></th>
	</tr>
		
	<tr v-for="p in users">
		<td>{{p.username }}</td>
		<td>{{p.name}}</td>
		<td>{{p.surname}}</td>
		<td>{{p.gender}}</td>
		<td>{{p.role}}</td>
	</tr>
</table>
</div>		  
`,
methods:{
	pretrazi: function(){
		var pol="",uloga="";
		if(document.getElementById("pol_p").value=="Muško")
			pol="Male";
		else if(document.getElementById("pol_p").value=="Žensko")
			pol="Female";
		if(document.getElementById("uloga_p").value=="Administrator")
			uloga="Administrator";
		else if(document.getElementById("uloga_p").value=="Gost")
			uloga="Guest";
		else if(document.getElementById("uloga_p").value=="Domaćin")
			uloga="Host"
		
		var search=document.getElementById("kime_p").value+";"+pol+";"+uloga;
	    axios
	    .get('rest/users/search',{params :{search: search}})
	    .then(response => {
	    	this.users = response.data;
	    	})
	}
},
mounted() {
	var search="";
    axios
    .get('rest/users/search',{params :{search: search}})
    .then(response => {
    	this.users = response.data;
    	})
}
});