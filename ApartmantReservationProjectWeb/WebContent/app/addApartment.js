Vue.component("addApartment", {
	data:function(){
		return{
            selected : "",
            object : null,
            name : '',
            rooms : '',
            guests : '',
            kids : '',
            long : '',
            lat : '',
            street : '',
            num : '',
            city : '',
            zipCode : '',
            price : '',
            checkInTime : '14:00',
            checkOutTime : '10:00'
		}
	},
    template: ` 
    <div class="add">
        <form class name="addApartment" id="addApartment">
            <h3>
                Kreiranje novog apartmana
            </h3>
            <div class="form-row mt-4">
                <div class="form-group col-md-6">
                    <label>Naziv objekta:</label>
                    <input type="text" class="form-control" id="inputName" v-model="name">
                    
                </div>
                <div class="form-group col-md-6">
                    <label>Tip objekta:</label>
                    <select class="custom-select" v-model="selected">
                        <option disabled value="">Izaberite tip objekta</option>
                        <option value="ClassicApartment">Ceo apartman</option>
                        <option value="Room">Soba</option>
                    </select>
                </div>                
            </div>
            <div class="form-row">
                <div class="form-group col-md-4">
                    <label>Broj soba:</label>
                    <input type="number" min="1" class="form-control" id="inputNumOfRooms" v-model="rooms">
                </div>
                <div class="form-group col-md-4">
                    <label>Broj odraslih gostiju:</label>
                    <input type="number" min="1" class="form-control" id="inputnumOfGuests" v-model="guests">
                </div>
                <div class="form-group col-md-4">
                    <label>Broj dece:</label>
                    <input type="number" min="0" class="form-control" id="inputnumOfKids" v-model="kids">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label>Geografska širina:</label>
                    <input type="text" class="form-control" id="inputLongitude" v-model="long">
                </div>
                <div class="form-group col-md-6">
                    <label>Geografska dužina:</label>
                    <input type="text" class="form-control" id="inputLatitude" v-model="lat">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-3">
                    <label>Ulica:</label>
                    <input type="text" class="form-control" id="inputStreet" v-model="street">
                </div>
                <div class="form-group col-md-3">
                    <label>Broj:</label>
                    <input type="number" min="1" class="form-control" id="inputNum" v-model="num">
                </div>
                <div class="form-group col-md-3">
                    <label>Grad:</label>
                    <input type="text" class="form-control" id="inputCity" v-model="city">
                </div>
                <div class="form-group col-md-3">
                    <label>Poštanski broj:</label>
                    <input type="number" min="0" class="form-control" id="inputZip" v-model="zipCode">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-4">
                    <label>Cena po noći:</label>
                    <input type="number" class="form-control" min="0" v-model="price">
                </div>
                <div class="form-group col-md-4 mt-4">
                    <label>Vreme za prijavu:</label>
                    <input type="time" required v-model="checkInTime">
                </div>
                <div class="form-group col-md-4 mt-4">
                    <label>Vreme za odjavu:</label>
                    <input type="time" required v-model="checkOutTime" >
                </div>
                
            </div>
            <button type="submit" class="btn btn-primary" v-on:click="checkForm()">Kreiraj</button>
            
        </form>
	</div>
    `,
    methods: {
        checkForm: function(){
           
            axios
                .post("rest/apartment/add", {   NameOfApartment : this.name,
                                                Type : this.selected,
                                                NumberOfRooms : this.rooms, 
                                                NumberOfAdultGuests : this.guests,
                                                NumberOfKids : this.kids,
                                                PricePerStayingNight : this.price,
                                                CheckInTime : this.checkInTime,
                                                CheckOutTime : this.checkOutTime,
                                                LocationOfApartment : {
                                                	Longitude : this.long,
                                                	Latitude : this.lat
                                                },
                                                ApartmentAddress : {
                                                    Street : this.street,
                                                    StreetNumber : this.num,
                                                    City : this.city,
                                                    PostalCode : this.zipCode                                                    
                                                },
                                               
                                                })
               .then(response=>{
                	this.object=response.data;
                })
                .catch(e=>{
                    alert('greska')
                })
        }
        
        
    }
    
	
	
});

