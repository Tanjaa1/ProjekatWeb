Vue.component("side-bar", {
	data: function () {
		return {
			apartments : [],
			amenities : []
		}
	},
	mounted(){
		axios
		.get('rest/apartment')
		.then(response => {
			this.apartments = response.data
		})

		axios
		.get('rest/amenities')
		.then(response => {
			this.amenities = response.data
		})
		
	},
	computed:{
	apartmentType(apartment){
		if(apartment.Type=="Room")
			return "Soba"
		else
			return "Ceo apartman"
	}
	
	},
	template: ` 
	<div class = "sidebar" >
		<div class="row">
			<div class="col-md-3 col-sm-12"> 
				<div class="border ml-2 mt-2 text-center">
					<h3>Pretraga apartmana</h3>
						
					<p class="mb-1">Datum prijavljivanja </p>
					<input type="date" class="search-field checkin col-sm-11 col-sm-offset-12">
					<p class="mb-1">Datum odjavljivanja </p>
					<input type="date" class="search-field checkout col-sm-11 col-sm-offset-12"">
					<p class="mb-1">Lokacija objekta </p>
					<input type="text" class="search-field location col-sm-11 col-sm-offset-12"" placeholder="Unesite naziv države/grada">
					<p class="mb-1">Odredite opseg budžeta </p>
					<div class="col-sm-12 col-sm-offset-12 mb-1">
						<div class="input-group">
							<div class="input-group-prepend">
								<span class="input-group-text">RSD</span>
								<span class="input-group-text">0</span>
							</div>
							<input type="number" class="form-control" placeholder="Minimalna cena objekta">
						
						</div>
					</div>
					<div class="col-sm-12 col-sm-offset-12">
						<div class="input-group">
							<input type="number" class="form-control" placeholder="Maksimalna cena objekta">
							<div class="input-group-append">
								<span class="input-group-text">RSD</span>
								<span class="input-group-text">+50 000</span>
							</div>
						</div>
					</div>
					<p class="mb-1">Broj soba u objektu</p>
					<input type="number" class="form-control">
					<p class="mb-1">Broj osoba koje mogu da odsednu u objektu</p>
					<div class="row mb-2">
						<div class="col md-6">
							<p class="mb-1">Deca</p>
							<input type="number" class="form-control">
						</div>
						<div class="col md-6">
							<p class="mb-1">Odrasli</p>
							<input type="number" class="form-control">
						</div>
					
					</div>
				</div>
				<div class="border ml-2
				 mt-2">
					<h3 style="text-align:center">Dodatni filteri za pretragu</h3>

					<div class="border ml-4 mr-4 mt-2">
						<p class="mb-1 mx-2">Odaberite tip objekta</p>
						<div class="form-check mx-4">
							<input class="form-check-input" type="checkbox" value="">
							<label class="form-check-label">
								Soba
							</label>
						</div>
						
						<div class="form-check mx-4">
							<input class="form-check-input" type="checkbox" value="">
							<label class="form-check-label">
								Ceo apartman
							</label>
						</div>
					</div>
					<div class="border ml-4 mr-4 mt-2">
						<p class="mb-1 mx-2">Sortirajte objekte po ceni</p>
						<div class="form-check mx-4">
							<input class="form-check-input" type="checkbox" value="">
							<label class="form-check-label">
								Rastuće
							</label>
						</div>
						<div class="form-check mx-4">
							<input class="form-check-input" type="checkbox" value="">
							<label class="form-check-label">
								Opadajuće
							</label>
						</div>
					</div>
					<div class="border ml-4 mr-4 mt-2 mb-2">
						<p class="mb-1 mx-2">Sadržaj apartmana</p>
						<div class="form-check mx-4" v-for="am in amenities" v-if="!am.deleted">
							<input class="form-check-input" type="checkbox" value="" >
							<label class="form-check-label">
								{{am.amenitiesName}}
							</label>
						</div>
					</div>
				</div>
			</div>

			<div class="col-md-1"></div>

			<div class="col-md-5 col-sm-12"> 
				<div class="border mt-2" v-for="a in apartments" v-if="!a.deleted">
					<div class="row">
						<div class="ml-4 mr-4 mt-4">
							<div class="gallery">
								<a target="_blank">
									<img src="images/soba.jpg" alt="Izgled sobe" width="600" height="400">
								</a>
							</div>
						</div>
						<div class="ml-4 mr-4 mt-4">
							<h5 style="color:#5c6ac4; text-align:center">{{a.NameOfApartment}}</h5>
							<p class="mb-1 mx-2"> Tip apartmana: </p>
							<label class="mx-2"> {{a.Type}}</label>
							<p class="mb-1 mx-2"> Cena: </p>
							<label class="mx-2">{{a.PricePerStayingNight}}</label>
							
						</div>
						<div class="center ml-10">
							<button v-on:click="detalji(a.id)" class="search-btn mx-10" type="button">
							Prikaži detaljnije
							</button>
						</div>
						
					</div>

				</div>		

				
				
			
			</div>

			<div class="col-md-3 col-sm-12"></div>
		</div>
	</div>
	
		
	`,
	methods:{
		detalji:function(id){
			window.location.href="#/apartment/"+id
		}
	}


});