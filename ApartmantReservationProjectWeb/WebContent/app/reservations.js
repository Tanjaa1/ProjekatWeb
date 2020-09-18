Vue.component("reservations", {	
	data: function(){
		return{
			reservations:null,
			original:null,
			user:{}
		}
	},
	beforeMount(){
		axios
		.get("rest/users/currentUser")
		.then(response=>{
			this.user=response.data;
			if(this.user.role==undefined){
				this.$router.push('forbidden');
			}else{
				if(this.user.role=='Administrator'){
					axios
					.get("rest/reservations/all")
					.then(response=>{
							this.reservations=response.data;
							for(var s of this.reservations){
								s.startDate=new Date(parseInt(s.startDate));
							}
							this.reservations=this.reservations;
					})
				}else if(this.user.role=="Guest"){
					axios
					.get("rest/reservations/guest")
					.then(response=>{
							this.reservations=response.data;
							for(var s of this.reservations){
								s.startDate=new Date(parseInt(s.startDate));
							}
							this.reservations=this.reservations;
					})
				}else{
					axios
					.get("rest/reservations/host")
					.then(response=>{
							this.reservations=response.data;
							for(var s of this.reservations){
								s.startDate=new Date(parseInt(s.startDate));
							}
							this.reservations=this.reservations;
					})
				}
			}
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
	                        <select class="form-control search-slt" id="sort"  @change="onChangeSort()">
		                        <option>Sortiranje</option>
		                        <option>Rastuće</option>
		                        <option>Opadajuće</option>
	                        </select>
                        </div>
                         <div class="col-lg-3 col-md-3 col-sm-12 p-1">
                         <a>Filtritaj po statusu:</a>
                          <select class="form-control search-slt" id="status"  @change="onChangeStatus()">
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
		<th v-if="role=='Guest' || role=='Host'">Promeni status</th>
	</tr>
	<tr v-for="r in reservations">
		<td>{{r.reservatedApartment.nameOfApartment}}</td>
		<td>{{r.guestWhoStays.name}} {{r.guestWhoStays.surname}}</td>
		<td>{{r.NumberOfStayingNights}}</td>
		<td>{{r.startDate.getDate()}}.{{r.startDate.getDay()}}.{{r.startDate.getFullYear()}}</td>
		<td>{{r.totalPrise}}</td>
		<td v-if="r.status=='Created'">Kreirana</td>
		<td v-if="r.status=='Accepted'">Prihvaćena</td>
		<td v-if="r.status=='DropedOut'">Odbijena</td>
		<td v-if="r.status=='Finalized'">Završena</td>
		<td v-if="r.status=='Rejected'">Odustao</td>		
		<td v-if="role=='Guest'"><button v-if="r.status=='Created' || r.status=='Accepted'" v-on:click="odustajem(r)">Odustajem</button></td>
		<td v-if="role==='Host'"><button v-if="r.status=='Created' || r.status=='Accepted'" v-on:click="odbijam(r)">Odbijam</button></td>
		<td v-if="role==='Host'"><button v-if=" r.status=='Created'" v-on:click="prihvatam(r)">Prihvatam &nbsp/&nbsp<button><button v-on:click="odbijam(r)">Odbijam</button></td>
	
	</tr>
</table>
</div>		  
	`,
	methods:{
		onChangeStatus:function(){
			var stat=document.getElementById("status").value;
			if(stat=="Odbijena")
				stat="DropedOut";
			else if(stat=="Kreirana")
				stat="Created";
			else if(stat=="Prihvaćena")
				stat="Accepted";
			else if(stat=="Završena")
				stat="Finalized";
			else
				stat="Rejected";
			axios
			.get("rest/reservations/stat",{params:{stat: stat}})
			.then(response=>{
				this.original=response.data;
				for(var s of this.original){
					s.startDate=new Date(parseInt(s.startDate));
				}
				this.reservations=null;
				this.reservations=this.original;
			})
		},
		onChangeSort:function(){
			var sort=document.getElementById("sort").value;

			this.original=this.reservations;
			if(sort=="Rastuće"){
				for(var i=0;i<this.original.length;i++){
					for(var j=i+1;j<this.original.length;j++){
						if(this.original[i].totalPrise > this.original[j].totalPrise){
							let tmp=this.original[i];
							this.original[i]=this.original[j];
							this.original[j]=tmp;
						}
						}
					}
			}else if(sort=="Opadajuće"){
				for(var i=0;i<this.original.length;i++){
					for(var j=i+1;j<this.original.length;j++){
						if(this.original[i].totalPrise < this.original[j].totalPrise){
							let tmp=this.original[i];
							this.original[i]=this.original[j];
							this.original[j]=tmp;
						}
						}
					}
			}
			this.reservations=null;
			this.reservations=this.original;
		},
		prihvatam:function(r){
			axios
			.get("rest/reservations/prihv",{params:{res: r.id}})
			.then(response=>{
				this.original=response.data;
				for(var s of this.original){
					s.startDate=new Date(parseInt(s.startDate));
				}
				this.reservations=null;
				this.reservations=this.original;
			})
		},
		odbijam:function(r){
			axios
			.get("rest/reservations/odb",{params:{res: r.id}})
			.then(response=>{
				this.original=response.data;
				for(var s of this.original){
					s.startDate=new Date(parseInt(s.startDate));
				}
				this.reservations=null;
				this.reservations=this.original;
			})
		},
		odustajem:function(r){
			axios
			.get("rest/reservations/odust",{params:{res: r.id}})
			.then(response=>{
				this.original=response.data;
				for(var s of this.original){
					s.startDate=new Date(parseInt(s.startDate));
				}
				this.reservations=null;
				this.reservations=this.original;
			})
		}
	}
});