Vue.component("side-bar", {
	data:function(){
		return{
		}
	},
	template: ` 
	<div class = "sidebar  border" >
			<div class="row border">
				<div class="col-md-3 col-sm-12"> 
					<div class="border ml-4 mt-2 text-center">
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
						<p class="mb-1">Izaberite broj soba u objektu</p>
						<select class="custom-select col-sm-11 col-sm-offset-12"">
							<option selected>Izaberite</option>
							<option value="1">Jedna soba</option>
							<option value="2">Dve sobe</option>
							<option value="3">Tri sobe</option>
							<option value="4">Četiri sobe</option>
							<option value="5">Pet soba</option>
							<option value="6">Šest soba</option>
							<option value="7">Sedam soba</option>
						  </select>
						<p class="mb-1">Izaberite broj osoba u koje mogu da odsednu objektu</p>
						<select class="custom-select col-sm-11 col-sm-offset-12 mb-2">
							<option selected>Izaberite</option>
							<option value="1">Jedna osoba</option>
							<option value="2">Dve osobe</option>
							<option value="3">Tri osobe</option>
							<option value="4">Četiri osobe</option>
							<option value="5">Pet osoba</option>
							<option value="6">Šest osoba</option>
							<option value="7">Sedam osoba</option>
                  		</select>
					</div>
					<div class="border ml-4 mt-2">
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
							<div class="form-check mx-4">
								<input class="form-check-input" type="checkbox" value="">
								<label class="form-check-label">
									WiFi
								</label>
							</div>
							<div class="form-check mx-4">
								<input class="form-check-input" type="checkbox" value="">
								<label class="form-check-label">
									TV
								</label>
							</div>
						</div>

					</div>
			


				</div>
				<div class="col-md-9 col-sm-12 bg-secondary"> oov je za prikaz</div>
			</div>


	</div>
	
		
	`
	
	
});