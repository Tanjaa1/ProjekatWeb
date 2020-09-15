Vue.component("reservations", {	
	data: function(){
		return{
			reservations:null
		}
	},
	beforeMount(){
		axios
		.get("rest/reservations/all")
		.then(response=>{
				this.reservations=response.data;
		})
	},
	template: ``,
});