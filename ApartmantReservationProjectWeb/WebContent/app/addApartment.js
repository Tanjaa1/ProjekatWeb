Vue.component("addApartment", {
	data:function(){
		return{
            data:{},
            selected : "",
            object:null
		}
	},
    template: ` 
    <div class="add">
        <form name="addApartment" id="add-apartment">
            <h3>
                Kreiranje novog apartmana
            </h3>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label>Tip objekta</label>
                    <select class="custom-select" v-model="selected">
                        <option disabled value="">Izaberite tip objekta</option>
                        <option value="ClassicApartment">Ceo apartman</option>
                        <option value="Room">Soba</option>
                    </select>
                </div>
                <div class="form-group col-md-3">
                    <label>Broj soba</label>
                    <input type="number" class="form-control" id="inputNumOfRooms" v-model="data.rooms">
                </div>
                <div class="form-group col-md-3">
                    <label>Broj gostiju</label>
                    <input type="number" class="form-control" id="inputnumOfGuests" v-model="data.guests">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label>Geografska širina</label>
                    <input type="text" class="form-control" id="inputLongitude" v-model="data.long">
                </div>
                <div class="form-group col-md-6">
                    <label>Geografska dužina</label>
                    <input type="text" class="form-control" id="inputLatitude" v-model="data.lat">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-3">
                    <label>Ulica</label>
                    <input type="text" class="form-control" id="inputStreet" v-model="data.street">
                </div>
                <div class="form-group col-md-3">
                    <label>Broj</label>
                    <input type="number" class="form-control" id="inputNum" v-model="data.num">
                </div>
                <div class="form-group col-md-3">
                    <label>Grad</label>
                    <input type="text" class="form-control" id="inputCity" v-model="data.city">
                </div>
                <div class="form-group col-md-3">
                    <label>Poštanski broj</label>
                    <input type="number" class="form-control" id="inputZip" v-model="data.zipCode">
                </div>
            </div>
            <button type="submit" class="btn btn-primary" v-on:click="checkForm()">Kreiraj</button>
        </form>
	</div>
    `,
    methods: {
        checkForm: function(){
           
            axios
                .post("rest/apartment/add", {   Type : this.selected,
                                                NumberOfRooms : this.data.rooms, 
                                                NumberOfGuests : this.data.guests,
                                                LocationOfApartment : {
                                                	Longitude : this.data.long,
                                                	Latitude : this.data.lat
                                                },
                                                ApartmentAddress : {
                                                    Street : this.data.street,
                                                    StreetNumber : this.data.num,
                                                    City : this.data.city,
                                                    PostalCode : this.data.zipCode                                                    
                                                }
                                                })
               .then(response=>{
                	this.object=response.data;
                })
        }
        
        
    }
    
	
	
});