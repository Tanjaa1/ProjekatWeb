Vue.component("host-apartments", {
	data: function () {
		return {
            apartments : [],
            checkedActive:[]
		}
    },
    beforeMount(){
		axios
		.get("rest/users/getRole")
		.then(response=>{
			if(response.data!="Host"){
				this.$router.push('forbidden');
			}
		})
	},
	mounted(){
		axios
		.get('rest/apartment')
		.then(response => {
			this.apartments = response.data
        })
        		
    },
    computed:{
        filteredApartments(){
            return this.apartments.filter(a=>{
               if(this.checkedActive.includes(a.isActive))
                return a
            })  
        }
    },

	template: ` 
	<div class = "sidebar" >
		<div class="row">
			<div class="col-md-3 col-sm-12"></div>
            
            <div class="col-md-7 col-sm-12"> 
                <h3>Svi moji objekti</h3>
                
                <div class="row mt-4 mb-4">
                    <div class="col">
                        <label>Prikaži prema statusu:</label>
                        <div class="form-check mx-4">
                            <input class="form-check-input" id="aktivni" type="checkbox" value="active" v-model='checkedActive'>
                            <label class="form-check-label">Aktivni</label>
                        </div>
                        <div class="form-check mx-4">
                            <input class="form-check-input" id="neaktivni" type="checkbox" value="inactive" v-model='checkedActive'>
                            <label class="form-check-label">Neaktivni</label>
                        </div>  
                    </div>
                    <div class="col">
                        <button class="search-btn mx-10" type="button" v-on:click="kreiraj()">Kreiraj novi objekat</button>
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
                                <div class="col">
                                    <button v-on:click="aktiviraj(a.id)" class="btn btn-primary" id="aktivirajBtn" type="submit">
                                        Aktiviraj 
                                    </button>
                                </div>
                                <div class="col">
                                    <button v-on:click="deaktiviraj(a.id)" class="btn btn-primary" id="deaktivirajBtn" type="submit">
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
        kreiraj : function(){
            window.location.href = "#/addapartment"
        },
        obrisi : function(id){
            axios
            .get("rest/apartment/delete/" + id)
            .then(response => {
                alert("Apartman je uspešno obrisan!");
            } )
            location.reload()
        },
        aktiviraj : function(id){           
            axios
            .get("rest/apartment/activate/" + id)
            .then(response => {
                alert("Apartman je uspešno aktiviran!");
            })
            location.reload()
        },
        deaktiviraj : function(id){
            axios
            .get("rest/apartment/deactivate/" + id)
            .then(response => {
                alert("Apartman je uspešno deaktiviran!");
            })
            location.reload()
        }
    }
});