Vue.component("search", {
	data:function(){
		return{
			grad : '',
            adults : '',
            kids : '',
            sobe : ''
		}
	},
	methods:{
		prikaz:function(){
			window.location.href = '/ApartmantReservationProjectWeb/#/allApartments?grad='+this.grad+'&sobe='+this.sobe+'&adults='+this.adults+'&kids='+this.kids;
		}
	},
    template: ` 
    <div class="header">
			<form>
				<h1>
					Pretražite apartmane
				</h1>
				<div class="form-box">
					<input type="text" class="search-field" placeholder="Grad.." v-model="grad">
					<input type="date" class="search-field checkin" placeholder="Datum prijave.." >
					<input type="date" class="search-field checkout" placeholder="Datum odjave.." >
					<input type="number" class="search-field" min="0" placeholder="Broj soba.." v-model="sobe">
					<input type="number" class="search-field" min="0" placeholder="Broj odraslih.." v-model="adults">
					<input type="number" class="search-field" min="0" placeholder="Broj dece.." v-model="kids">
					
					<button v-on:click="prikaz" class="search-btn" type="button">Pretraga</button>				

				</div>
			</form>
		</div>
    `
	
});