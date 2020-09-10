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
                            <input class="form-control search-slt" placeholder="Korisničko ime"/>
                        </div>
                        <div class="col-lg-3 col-md-3 col-sm-12 p-1">
                         <input class="form-control search-slt"  placeholder="Ime"/>
                        </div>
                          <div class="col-lg-3 col-md-3 col-sm-12 p-1">
                          <input class="form-control search-slt"  placeholder="Prezime"/>
                        </div>
                        <div class="col-lg-3 col-md-3 col-sm-12 p-2">
                            <button type="button" style="backgroundColor:#5c6ac4"><i class="fas fa-search"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</section>
<br>
	<table class="table table-bordered" border="1">
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
mounted() {
	var search="";
    axios
    .get('rest/users/search',search)
    .then(response => {
    	this.users = response.data;
    	})
}
});