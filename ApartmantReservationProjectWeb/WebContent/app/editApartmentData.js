Vue.component("editApartment", {
	data:function(){
		return{
            id : this.$route.params.id,
            apartment : Object,
			address : Object,
            location : Object,
            selected : "",
            ret:Object,
            calendar : null,
			calendarRendered: false
		}
    },
    mounted(){
    	this.calendar = new ej.calendars.Calendar({
			isMultiSelection: true,
			values: [],
			min: new Date(),
			showTodayButton: false,
		});
		axios
		.get('rest/apartment/' + this.id)
		.then(response=>{
			this.apartment=response.data
			this.address=response.data.ApartmentAddress
			this.location=response.data.LocationOfApartment
			this.calendar.values = [];
			this.apartment.availableDates.forEach(date=> { this.calendar.values.push(new Date(date)) });
		})
		
	},
	updated: function () {
		if (this.calendarRendered == false) {
			this.calendar.appendTo('#calendar');
			this.calendarRendered = true;
		}	
	},
    template: ` 
    <div class="edit">
        <form name="editApartment">
            <h3>
                Izmena podataka o apartmanu
            </h3>
            <div>
					<h5>Dodavanje slobodnih datuma</h5>
					<div class="row ml-4">
						<div id="calendar" style="max-width: 40%"></div>
						<div class="col">
							<button class="btn btn-info" v-on:click="submitCalendar">Sačuvaj</button>
							<button class="btn btn-secondary" v-on:click="cancelCalendar">Odustani</button>
						</div>
					</div>
				</div>
            <div class="form-row mt-4">
                <div class="form-group col-md-6">
                    <label>Naziv objekta:</label>
                    <input type="text" class="form-control" id="inputName" v-model="apartment.nameOfApartment" disabled="disabled">
                </div>
                <div class="form-group col-md-6">
                    <label>Tip objekta:</label>
                    <select class="custom-select" id="inputType" v-model="apartment.type" disabled="disabled">
                        <option disabled value="">Izaberite tip objekta</option>
                        <option value="ClassicApartment">Ceo apartman</option>
                        <option value="Room">Soba</option>
                    </select>
                </div>                
            </div>
            <div class="form-row">
                <div class="form-group col-md-4">
                    <label>Broj soba:</label>
                    <input type="number" min="1" class="form-control" id="inputNumOfRooms" v-model="apartment.numberOfRooms" disabled="disabled">
                </div>
                <div class="form-group col-md-4">
                    <label>Broj odraslih gostiju:</label>
                    <input type="number" min="1" class="form-control" id="inputnumOfGuests" v-model="apartment.numberOfAdultGuests" disabled="disabled">
                </div>
                <div class="form-group col-md-4">
                    <label>Broj dece:</label>
                    <input type="number" min="0" class="form-control" id="inputnumOfKids" v-model="apartment.numberOfKids" disabled="disabled">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label>Geografska širina:</label>
                    <input type="text" class="form-control" id="inputLongitude" v-model="location.longitude" disabled="disabled">
                </div>
                <div class="form-group col-md-6">
                    <label>Geografska dužina:</label>
                    <input type="text" class="form-control" id="inputLatitude" v-model="location.latitude" disabled="disabled">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-3">
                    <label>Ulica:</label>
                    <input type="text" class="form-control" id="inputStreet" v-model="address.street" disabled="disabled">
                </div>
                <div class="form-group col-md-3">
                    <label>Broj:</label>
                    <input type="number" min="1" class="form-control" id="inputNum" v-model="address.streetNumber" disabled="disabled">
                </div>
                <div class="form-group col-md-3">
                    <label>Grad:</label>
                    <input type="text" class="form-control" id="inputCity" v-model="address.city" disabled="disabled">
                </div>
                <div class="form-group col-md-3">
                    <label>Poštanski broj:</label>
                    <input type="number" min="0" class="form-control" id="inputZip" v-model="address.postalCode" disabled="disabled">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-4">
                    <label>Cena po noći:</label>
                    <input type="number" id="inputPrice" class="form-control" min="0" v-model="apartment.pricePerStayingNight" disabled="disabled">
                </div>
                <div class="form-group col-md-4 mt-4">
                    <label>Vreme za prijavu:</label>
                    <input type="time" id ="checkIn" v-model="apartment.checkInTime" disabled="disabled"> 
                </div>
                <div class="form-group col-md-4 mt-4">
                    <label>Vreme za odjavu:</label>
                    <input type="time" id = "checkOut"v-model="apartment.checkOutTime" disabled="disabled">
                </div>
                
            </div>
            <button id="edit" type="submit" class="btn btn-primary" v-on:click="edit()">Izmeni podatke</button>
            <button  id="save" type="submit" disabled="disabled" class="btn btn-primary" v-on:click="save()">Sačuvaj izmene</button>
        </form>
	</div>
    `,
    methods:{
        edit: function(){
            
            document.getElementById("save").disabled=false;
		    document.getElementById("edit").disabled=true;

            document.getElementById("inputName").disabled=false;
            document.getElementById("inputType").disabled=false;
            document.getElementById("inputNumOfRooms").disabled=false;
            document.getElementById("inputnumOfGuests").disabled=false;
            document.getElementById("inputnumOfKids").disabled=false;
            document.getElementById("inputLongitude").disabled=false;
            document.getElementById("inputLatitude").disabled=false;
            document.getElementById("inputStreet").disabled=false;
            document.getElementById("inputNum").disabled=false;
            document.getElementById("inputCity").disabled=false;
            document.getElementById("inputZip").disabled=false;
            document.getElementById("inputPrice").disabled=false;
            document.getElementById("checkIn").disabled=false;
            document.getElementById("checkOut").disabled=false;
        },
        save: function(){
            axios
            .post('rest/apartment/add',this.apartment)
            .then(response =>{
                this.ret=response.data
                alert('Uspešno ste izmenili podatake o apartmanu!')
            })
            .catch(e=>{
                alert('Greška prilikom izmene podataka o apartmanu!')
            })
        },
        submitCalendar() {
			this.apartment.availableDates = [];
			this.calendar.values.forEach(date => this.apartment.availableDates.push(date.getTime()));
			 axios
	            .post('rest/apartment/add',this.apartment)
	            .then(response =>{
	                this.ret=response.data
	                alert('Uspešno ste izmenili podatake o apartmanu!')
	            })
	            .catch(e=>{
	                alert('Greška prilikom izmene podataka o apartmanu!')
	            })
		},
		cancelCalendar() {
			axios
			.get('rest/apartments/search/' + this.id)
			.then(response => {
				this.apartment = response.data;
				this.calendar.values =[]
				this.apartment.availableDates.forEach(date=> { this.calendar.values.push(new Date(date)) });
			});
		},
		
    }
	
	
});