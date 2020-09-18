Vue.component("admin-apartments", {
	data: function () {
		return {
            apartments : [],
            apartmentsBackUp: [],
            checkedActive:[],
            checkedApType:[],
            grad : '',
            minCena : '',
            maxCena : '',
            adults : '',
            kids : '',
            sobe : ''
		}
    },
    beforeMount(){
		axios
		.get("rest/users/getRole")
		.then(response=>{
			if(response.data!="Administrator"){
				this.$router.push('forbidden');
			}
		})
	},
	mounted(){
		axios
		.get('rest/apartment')
		.then(response => {
            this.apartments = response.data;
            this.apartmentsBackUp = this.apartments;
        })
        		
    },
  

	template: ` 
	<div id = "sidebar">
		<div class="row">
            <div class="col-md-3 col-sm-12">
            <div class="border ml-2 mt-2 text-center">
                <h3 style="color:#5c6ac4;">Pretraga objekata</h3>
                    
                <p class="mb-1">Datum prijavljivanja </p>
                <input type="date" class="search-field checkin col-sm-11 col-sm-offset-12">
                <p class="mb-1">Datum odjavljivanja </p>
                <input type="date" class="search-field checkout col-sm-11 col-sm-offset-12"">
                <p class="mb-1">Lokacija objekta </p>
                <input type="text" class="form-control col-sm-11 col-sm-offset-12" placeholder="Unesite naziv grada" v-model="grad" v-on:change="pretragaGrad">
                <p class="mb-1">Odredite opseg budžeta </p>
                <div class="col-sm-12 col-sm-offset-12 mb-1">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text">RSD</span>
                            <span class="input-group-text">0</span>
                        </div>
                        <input type="number" class="form-control" placeholder="Minimalna cena objekta" v-model="minCena" v-on:change="cena">                    
                    </div>
                </div>
                <div class="col-sm-12 col-sm-offset-12">
                    <div class="input-group">
                        <input type="number" class="form-control" placeholder="Maksimalna cena objekta" v-model="maxCena" v-on:change="cena">
                        <div class="input-group-append">
                            <span class="input-group-text">RSD</span>
                            <span class="input-group-text">+50 000</span>
                        </div>
                    </div>
                </div>
                <p class="mb-1">Broj soba u objektu</p>
                <input type="number" class="form-control" class="form-control" v-model="sobe" v-on:change="brSoba">
                <p class="mb-1">Broj osoba koje mogu da odsednu u objektu</p>
                <div class="row mb-2">
                    <div class="col md-6">
                        <p class="mb-1">Odrasli</p>
                        <input type="number" class="form-control" v-model="adults" v-on:change="brOsoba">
                    </div>
                    <div class="col md-6">
                        <p class="mb-1">Deca</p>
                        <input type="number" class="form-control" v-model="kids" v-on:change="brOsoba">
                    </div>
                
                </div>
            </div>
            </div>
            
            <div class="col-md-7 col-sm-12"> 
                <h3 style="color:#5c6ac4;">Svi objekti</h3>
                
                <div class="row mt-4 mb-4">
                    <div class="col">
                        <label>Prikaži prema statusu:</label>
                        <div class="form-check mx-4">
                            <input class="form-check-input" id="aktivni" type="checkbox" value="active" v-model='checkedActive' v-on:change="apartmani">
                            <label class="form-check-label">Aktivni</label>
                        </div>
                        <div class="form-check mx-4">
                            <input class="form-check-input" id="neaktivni" type="checkbox" value="inactive" v-model='checkedActive' v-on:change="apartmani">
                            <label class="form-check-label">Neaktivni</label>
                        </div>  
                    </div>
                    <div class="col">
                        <label>Prikaži prema tipu:</label>
                        <div class="form-check mx-4">
                            <input class="form-check-input" id="soba" type="checkbox" value="Room" v-model='checkedApType' v-on:change="apType">
                            <label class="form-check-label">Soba</label>
                        </div>
                        <div class="form-check mx-4">
                            <input class="form-check-input" id="apartman" type="checkbox" value="ClassicApartment" v-model='checkedApType' v-on:change="apType">
                            <label class="form-check-label">Ceo apartman</label>
                        </div>  
                    </div>          
                </div>
				<div class="border mt-2" v-for="a in apartments" v-if="!a.deleted">
					<div class="row">
						<div class="ml-4 mr-4 mt-4">
							<div class="gallery">
								<a target="_blank">
									<img src="images/soba.jpg" alt="Izgled sobe" width="600" height="400">
								</a>
							</div>
						</div>
						<div class="ml-4 mr-4 mt-2">
							<h5 style="color:#5c6ac4; text-align:center">{{a.NameOfApartment}}</h5>
							<p class="mb-1 mx-2"> Tip apartmana: </p>
							<label class="mx-2"> {{a.Type}}</label>
							<p class="mb-1 mx-2"> Cena: </p>
							<label class="mx-2">{{a.PricePerStayingNight}}</label>
							
                        </div>
                        <div class="row">
                            <div class="col md-4 mt-3 ml-3">
                                <div class="col">
                                    <button v-on:click="detalji(a.id)" class="search-btn" type="button">
                                        Prikaži detalje
                                    </button>
                                </div>
                                <div class="col">
                                    <button v-on:click="izmena(a.id)" class="search-btn" type="button">
                                        Izmeni 
                                    </button>
                                </div>
                                <div class="col">
                                    <button v-on:click="obrisi(a.id)" class="search-btn" type="button">
                                        Obriši 
                                    </button>
                                </div>
                            </div>
                            
                            <div class="col md-4 md-4 mt-3 ml-3"> 
                                <div class="col" v-if="a.isActive=='inactive'">
                                    <button v-on:click="aktiviraj(a.id)"  class="btn btn-primary" id="aktivirajBtn" type="submit">
                                        Aktiviraj 
                                    </button>
                                </div>
                                <div class="col" v-else>
                                    <button v-on:click="deaktiviraj(a.id)"  class="btn btn-primary" id="deaktivirajBtn" type="submit">
                                        Dektiviraj 
                                    </button>
                                </div>
                            </div>
                        </div>                     						
					</div>
				</div>				
			</div>

			<div class="col-md-2 col-sm-12"></div>
		</div>
	</div>
	
		
	`,
	methods:{
		detalji : function(id){
			window.location.href="#/apartment/" + id
        },
        izmena : function(id){
            window.location.href = "#/editapartment/" + id
        },
        obrisi : function(id){
            axios
            .get("rest/apartment/delete/" + id)
            .then(response => {
                alert("Apartman je uspešno obrisan!");
            } )
            location.reload()
            .catch(e=>{
                alert('Greška prilikom brisanja apartmana!')
            })
        },
        aktiviraj : function(id){           
            axios
            .get("rest/apartment/activate/" + id)
            .then(response => {
                alert("Apartman je uspešno aktiviran!");
            })
            location.reload()
            .catch(e=>{
                alert('Greška prilikom aktivacije apartmana!')
            })
        },
        deaktiviraj : function(id){
            axios
            .get("rest/apartment/deactivate/" + id)
            .then(response => {
                alert("Apartman je uspešno deaktiviran!");
            })
            location.reload()
            .catch(e=>{
                alert('Greška prilikom izmene deaktivacije apartmana!')
            })
        },
        apartmani : function(){
            if(this.checkedActive.length == 0 || this.checkedActive.length == 2) {
                this.apartments = this.apartmentsBackUp;
                return;
            }

            var list= [];
            for(a of this.apartmentsBackUp){
                if(a.isActive == this.checkedActive[0]){
                    list.push(a);
                }
            }
            this.apartments = list;
        },
        pretragaGrad : function(){
            if(this.grad == "") {
                this.apartments = this.apartmentsBackUp;
                return;
            }

            var list= [];
            for(a of this.apartmentsBackUp){
                if(a.apartmentAddress.city.toLowerCase() == this.grad.toLowerCase()){
                    list.push(a);
                }
            }
            this.apartments = list;
        },
        apType : function(){
            if(this.checkedApType.length == 0 || this.checkedApType.length == 2) {
                this.apartments = this.apartmentsBackUp;
                return;
            }

            var list= [];
            for(a of this.apartmentsBackUp){
                if(a.type == this.checkedApType[0]){
                    list.push(a);
                }
            }
            this.apartments = list;
        },
        cena : function(){
            if(this.minCena == "" || this.maxCena == "") {
                this.apartments = this.apartmentsBackUp;
                return;
            }

            var list= [];
            for(a of this.apartmentsBackUp){
                if(a.pricePerStayingNight >= this.minCena && a.pricePerStayingNight <= this.maxCena){
                    list.push(a);
                }
            }
            this.apartments = list;
        },
        brOsoba : function(){
            if(this.kids == "" || this.adults == "") {
                this.apartments = this.apartmentsBackUp;
                return;
            }

            var list= [];
            for(a of this.apartmentsBackUp){
                if(a.numberOfAdultGuests == this.adults && a.numberOfKids == this.kids){
                    list.push(a);
                }
            }
            this.apartments = list;
        },
        brSoba : function(){
            if(this.sobe == "") {
                this.apartments = this.apartmentsBackUp;
                return;
            }

            var list= [];
            for(a of this.apartmentsBackUp){
                if(a.numberOfRooms == this.sobe){
                    list.push(a);
                }
            }
            this.apartments = list;
        }
    }
});