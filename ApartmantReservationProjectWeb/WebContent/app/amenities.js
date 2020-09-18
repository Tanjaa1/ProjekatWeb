Vue.component("amenities", {	
	data: function(){
        return{
            amenities : [],
            object : null,
            name : ''
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
		.get('rest/amenities')
		.then(response => {
			this.amenities = response.data
        })		
	},
    template: 
    ` 
    <div>
        <div class="row">
            <div class="col md-3"></div>
            <div class="col md-6">
                <h3 style="color:#5c6ac4; text-align:center"> Sadržaj apartmana</h3>

                <p>Unesite naziv sadržaja: </p>
                <div class="form-group">
                    <input type="text" class="form-control" id="sadrzaj" v-model="name"></input>
                    <button type="submit" class="btn btn-primary mt-2" v-on:click="kreiraj()">Kreiraj sadržaj</button>
                </div>

                <table id="table" class="table table-bordered" border="1">
                    <tr>
                        <th class="bg-light" colspan="6" style="text-align:center">
                            <h2>Svi sadržaji</h2>
                        </th>
                    </tr>
                    <tr class="bg-light"> 
                        <th>Sadrzaj</th>
                        <th></th>
                        <th></th>
                    </tr>
                        
                    <tr v-for="a in amenities" v-if="!a.deleted">
                        <td> 
                            <p id="amName">{{a.amenitiesName}}</p>
                        </td>
                        <td>
                            <button v-on:click="obrisi(a.id)" class="search-btn" type="button">
                                Obriši 
                            </button>
                        </td>
                        <td>
                            <button v-on:click="izmeni(a)" class="search-btn" type="button" id="btnIzmena">
                                Izmeni 
                            </button>
                        </td>
                    </tr>
                </table>
            
            </div>
            <div class="col md-3"></div>
        </div>
    </div>
    `,
    methods:{
		kreiraj:function(){
            if(this.name != ""){
                axios
                .post("rest/amenities/add",{ AmenitiesName : this.name })
                .then(response => {
                    this.object = response.data;
                    alert('Uspešno ste dodali sadržaj!')
                    location.reload()
                })
                .catch(e => {
                    alert('Došlo je do greške pri kreiranju sadržaja!')
                })
            }
            
        },
        obrisi : function(id){
            axios
            .get("rest/amenities/delete/" + id)
            .then(response => {
                alert("Sadržaj je uspešno obrisan!");
                location.reload()
            })
            .catch(e => {
                alert('Došlo je do greške pri brisanju sadržaja!')
            })
        },
        izmeni : function(a){
            
            var prozor = prompt("Izmenite podatke o ovom sadržaju:",a.amenitiesName );
            if (prozor == null || prozor == "") {
                
            } else {
                a.amenitiesName=prozor
                axios
                .post("rest/amenities/add", a)
                .then(response => {
                    this.object = response.data;
                    alert('Uspešno ste izmenili naziv sadržaja!')
                })
                .catch(e => {
                    alert('Došlo je do greške pri izmeni naziva sadržaja!')
                })
            }
            
            
        }
	}
});