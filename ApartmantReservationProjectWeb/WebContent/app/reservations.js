Vue.component("reservations", {	
	data: function(){
		return{
			reservations:null,
			user:null
		}
	},
	beforeMount(){
		axios
		.get("rest/reservations/all")
		.then(response=>{
				this.reservations=response.data;
		})
		
		axios
		.get("rest/users/currentUser")
		.then(response=>{
			this.user=response.data
		})
	},
	template: `
	<div class="tabelaa">
	<section class="search-sec">
    <div class="container">
        <form action="#" >
            <div class="row">
            <div class="col-lg-3 col-md-3 col-sm-12 p-1">
        </div>
                <div class="col-lg-12">
                    <div class="row">
                        <div class="col-lg-3 col-md-3 col-sm-12 p-1">
                        <a>Sortiraj cenu:</a>
	                        <select class="form-control search-slt" id="sort">
		                        <option>Sortiranje</option>
		                        <option>Rastucće</option>
		                        <option>Opadajuće</option>
	                        </select>
                        </div>
                         <div class="col-lg-3 col-md-3 col-sm-12 p-1">
                         <a>Filtritaj po statusu:</a>
                          <select class="form-control search-slt" id="status">
	                          <option>Status</option>
	                          <option>Kreirana</option>
	                          <option>Prihvaćena</option>
	                          <option>Odbijena</option>
	                          <option>Završena</option>
	                          <option>Odustao</option>
	                       </select>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</section>
	
	<br/>
	<table id="table" v-bind:class="{table: user.role!='Administrator'}" border="1">
	<tr>
		<th class="bg-light" colspan="6" style="text-align:center"><h1><b>Rezervacije</b></h1></th>
	</tr>
	<tr class="bg-light">
		<th><b>Apartman</b></th>
		<th><b>Ime i prezime gosta</b></th>
		<th><b>Broj noćenja</b></th>
		<th><b>Datum početka</b></th>
		<th><b>Ukupna cena u RSD</b></th>
		<th><b>Status</b></th>
	</tr>
	<tr v-for="r in reservations">
		<td>{{r.reservatedApartment.nameOfApartment}}</td>
		<td>{{r.guestWhoStays.name}} {{r.guestWhoStays.surname}}</td>
		<td>{{r.NumberOfStayingNights}}</td>
		<td>{{r.startDate}}</td>
		<td>{{r.totalPrise}}</td>
		<td v-if="r.status=='Created'">Kreirana</td>
		<td v-if="r.status=='Accepted'">Prihvaćena</td>
		<td v-if="r.status=='DropedOut'">Odbijena</td>
		<td v-if="r.status=='Finalized'">Završena</td>
		<td v-if="r.status=='Rejected'">Odustao</td>
	</tr>
</table>
</div>		  
	`
});