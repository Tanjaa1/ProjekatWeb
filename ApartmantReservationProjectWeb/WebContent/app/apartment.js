Vue.component("apartment", {
	data: function () {
		return {
				id : this.$route.params.id,
				apartment : Object,
				address : Object,
				location : Object
		}
	},
	beforeMount(){
		axios
		.get("rest/users/currentUser")
		.then(response=>{
			if(response.data==null || response.data.role!="Guest"){
				$('#rezervacija').hide();
			}
		})

	},
	methods:{
		Cena: function(){

			var night=document.getElementById("noc").value;
			var date=document.getElementById("start").value;
			var poruka=document.getElementById("poruka").value;
			var noci=parseInt(night);
			if(isNaN(noci)){
				document.getElementById("noc").value="";
				document.getElementById("nemaNoc").innerHTML="Morate uneti broj noćenja(minimalan broj noćenja je 1)!";
			}else{
				document.getElementById("noc").value=noci;
				var reservation={reservatedApartment : this.apartment, numberOfStayingNights: noci, startDate: date, message: poruka};
			    
			    axios
				.post("rest/reservations/cost",reservation)
				.then(response => {
					var cena=response.data;
					document.getElementById("cena").innerHTML="Ukupna cena iznosi "+cena+" RSD";
				})
			}
		},
		Rezervisi: function(){
			var night=document.getElementById("noc").value;
			var startDate=document.getElementById("start").value;
			var poruka=document.getElementById("poruka").value;
			var noci=parseInt(night);
			if(isNaN(noci)){
				document.getElementById("noc").value="";
				document.getElementById("nemaNoc").innerHTML="Morate uneti broj noćenja(minimalan broj noćenja je 1)!";
			}else{
				document.getElementById("noc").value=noci;
				var reservation={reservatedApartment : this.apartment, numberOfStayingNights: night, startDate: startDate, message: poruka};
			    axios
				.post("rest/reservations/add",reservation)
				.then(response => {
					document.getElementById("noc").value="";
					document.getElementById("poruka").value=""
					document.getElementById("cena").innerHTML="";
				})
			}
		},
		Odustani: function(){
			document.getElementById("noc").value="";
			document.getElementById("poruka").value=""
			document.getElementById("cena").innerHTML="";
		}
	},
	mounted(){
		var d=new Date();
		var day = d.getDate();
	    var month = d.getMonth() + 1;
	    var year = d.getFullYear();

	    if (month < 10) month = "0" + month;
	    if (day < 10) day = "0" + day;

	    var today = year + "-" + month + "-" + day; 
		document.getElementById("start").value = today;
		document.getElementById("start").min = today;
		axios
		.get('rest/apartment/' + this.id)
		.then(response=>{
			this.apartment=response.data;
			this.address=response.data.ApartmentAddress;
			this.location=response.data.LocationOfApartment;
		})
	},
	computed:
		{
		apartmentType(){
			if(this.apartment.Type=="Room")
				return "Soba";
			else
				return "Ceo apartman";
		}
		
		},
    template: ` 

    <div class="apartment">
        <div class="row">

            <div class="col-md-4 col-sm-12 mt-5 ml-5 mb-4"> 
                <div id="carouselExampleControls" class="carousel slide mt-5" data-ride="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img class="d-block" width="610" height="450" src="images/soba.jpg" alt="Slika1">
                        </div>
                        <div class="carousel-item">
                            <img class="d-block" width="610" height="450" src="images/soba1.jpg" alt="Slika2">
                        </div>
                        <div class="carousel-item">
                            <img class="d-block" width="610" height="450" src="images/hotel.jpg" alt="Slika3">
                        </div>
                    </div>
                    <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>

            </div>

            <div class="col-md-4 col-sm-12 mt-4 mb-4">
                <h4 style="text-align:center">{{apartment.NameOfApartment}}</h4>
                <h5 style="text-align:left">Domaćin: {{apartment.ApartmentHost}}</h5>
                <div class="border mt-2 mb-2 ml-2 mr-2">
                    <p class=" mt-2 ml-2"> 
                        <label>Tip objekta:</label>
                        <label>{{apartmentType}}</label>
                    </p>
                    <p class="ml-2">
                        <label>Broj soba:</label>
                        <label>{{apartment.NumberOfRooms}}</label>
                    </p>
                    <p class="ml-2">
                        <label>Broj gostiju</label>
                        <p class="ml-2">Odrasli: {{apartment.NumberOfAdultGuests}}</p>
                        <p class="ml-2">Deca: {{apartment.NumberOfKids}}</p>
                    </p>
                    <p class="ml-2">
                        <label>Adresa objekta</label>
                        <p class="ml-2">Ulica i broj: {{address.Street}} {{address.StreetNumber}}</p>
                        <p class="ml-2">Grad: {{address.City}}</p>
                        <p class="ml-2">Postanski broj: {{address.postalCode}} </p>
                        <p class="ml-2">Koordinate</p>
                        <p class="ml-2">Geografska širina: {{location.Longitude}}</p>
                        <p class="ml-2">Geografska dužina: {{location.Latitude}} </p>
                    </p>
                    <p class="ml-2">
                        <label>Dostupni datumi:</label>
                    </p>
                    <p class="ml-2">
                        <label>Cena po noći: {{apartment.PricePerStayingNight}}</label>
                    </p>
                    
                    <p class="ml-2">Vreme za prijavu: {{apartment.CheckInTime}}</p>
                    <p class="ml-2">Vreme za odjavu: {{apartment.CheckOutTime}}</p>
                    </p>
                </div>
            </div>

            <div id="rezervacija" class="col-md-3 col-sm-12 mt-4 mb-4"> 
                <h4 style="text-align:center">Rezervacija</h4>
	            <div class = "border"></div><br/>
	            <div class="form-group">
					<label>Unesite početan datum rezervacije:</label>
					<input id="start" type="date" class="form-control" />
					<span id="los" style="color:red; visibility:hidden">Datum nije slobodan!</span><br>
				</div><br/>
	            <div class="form-group">
					<label>Broj noćenja:</label>
					<input id="noc" type="text" class="form-control"/>
					<span id="nemaNoc" style="color:red;"></span><br>
					<button class="search-btn" type="button" v-on:click="Cena()">Izračunaj cenu</button>&nbsp<label id="cena"></label>
				</div><br/>
	            <div class="form-group">
					<label>Poruka za domaćina:</label>
					<textarea id="poruka" name="w3review" rows="4" cols="50"> </textarea>
				</div><br/>
				<button class="search-btn" type="button" v-on:click="Rezervisi()">Rezerviši apartman</button>
				<button class="search-btn" type="button" v-on:click="Odustani()">Odustani</button>
			</div>
            </div>
        </div>
    </div>
    
    `
});

