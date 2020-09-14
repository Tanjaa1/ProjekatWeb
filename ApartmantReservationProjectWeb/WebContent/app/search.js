Vue.component("search", {
	data:function(){
		return{
			startDate:'',
			endDate:''
		}
	},
	methods:{
		prikaz:function(){
			this.$router.push("allApartments")
		}
	},
    template: ` 
    <div class="header">
			<form>
				<h1>
					Pretražite apartmane
				</h1>
				<div class="form-box">
					<input type="text" class="search-field location" required placeholder="Naziv apartmana..">
					<input type="date" class="search-field checkin" required v-model='startDate' placeholder="Datum prijave.." >
					<input type="date" class="search-field checkout" placeholder="Datum odjave.." required v-model='endDate'>
					<input type="number" class="search-field rooms" min="0" required placeholder="Broj soba..">
					<input type="number" class="search-field adults"min="0" required placeholder="Broj odraslih..">
					<input type="number" class="search-field rooms" min="0" required placeholder="Broj dece..">
					
					<button v-on:click="prikaz" class="search-btn" type="button">Pretraga</button>				

				</div>
			</form>
		</div>
    `
	
});