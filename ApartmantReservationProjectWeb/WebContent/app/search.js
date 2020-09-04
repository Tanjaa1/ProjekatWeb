Vue.component("search", {
	data:function(){
		return{
			startDate:'',
			endDate:''
		}
	},
    template: ` 
    <div class="header">
			<form>
				<h1>
					Pretražite apartmane
				</h1>
				<div class="form-box">
					<input type="text" class="search-field location" placeholder="Naziv apartmana..">

					<input type="date" class="search-field checkin" required v-model='startDate' placeholder="Datum prijave.." >
					<input type="date" class="search-field checkout" placeholder="Datum odjave.." required v-model='endDate'>

					<input type="text" class="search-field guests" placeholder="Broj gostiju..">

					<button class="search-btn" type="button">Pretraga</button>				

				</div>
			</form>
		</div>
    `
	
});