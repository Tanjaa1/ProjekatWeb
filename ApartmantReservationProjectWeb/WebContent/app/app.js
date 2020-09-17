const Search={template: '<search></search>'}
const SideBar={template: '<side-bar></side-bar>'}
const ApartmentView={template: '<apartment></apartment>'}
const AddAparment={template: '<addApartment></addApartment>'}
const HostApartments={template: '<host-apartments></host-apartments>'}
const EditApartment={template: '<editApartment></editApartment>'}
const Registration={template: '<reg-page></reg-page>'}
const Profile={template: '<user-info></user-info>'}
const Users={template: '<users></users>'}
const Amenities={template: '<amenities></amenities>'}
const Reservations={template: '<reservations></reservations>'}
const router = new VueRouter({
	  mode: 'hash',
	  routes: [
	   { path: '/', component: Search},
	   { path: '/reg', component: Registration},
	   { path: '/profile', component: Profile},
	   { path: '/users', component: Users},
	   { path: '/addapartment', component: AddAparment},
	   { path: '/hostapartments', component: HostApartments},
	   { path: '/editapartment/:id', component: EditApartment},
	   { path: '/allapartments', component: SideBar, name:"allApartments"},
	   { path: '/apartment/:id', component:ApartmentView},
	   { path: '/amenities', component:Amenities},
	   { path: '/reservations', component:Reservations},
	   { path: '/forbidden',name:"forbidden"}

	  ]
});

var app = new Vue({
	router,
	el: '#app',
	data:{
		regg:false,
		loginInformation:{},
		user:null
	},
	
	methods:{
		login: function(loginInformation){
			$.post({
				url: 'rest/users/login',
				data: JSON.stringify({username: this.loginInformation.username, password: this.loginInformation.password}),
				contentType: 'application/json',
				success: function(product) {
					$('#userInfo').show();
					$('#users').show();
					$('#myApartments').show();
					$('#apartments').show();
					$('#rez').show();
					$('#prijava').hide();
					$('#registr').hide();
					$('#odj').show();
					//this.$router.push('allapartments');
				},
				error: function(message) {
					alert("Pogrešno ime ili lozinka!");
				}
			});

			this.Provera();
		},
	Odjava: function(){
		axios
		.post("rest/users/logout")
		.then(response => {
			$('#userInfo').hide();
			$('#users').hide();
			$('#apartments').hide();
			$('#myApartments').hide();
			$('#rez').hide();
			$('#odj').hide();
			$('#registr').show();
			$('#prijava').show();
		})
		this.$router.push('/');
	},
	Provera: function(){
		axios
		.get("rest/users/getRole")
		.then(response => {			
			if(response.data!="Administrator"){
				$('#users').hide();
			}
			if(response.data=="Host"){
				$('#myApartments').show();
			 	$('#apartments').hide();
			} else{
				$('#myApartments').hide();
			}
		})
	}
},
mounted() {
	$('#userInfo').hide();
	$('#apartments').hide();
	$('#myApartments').hide();
	$('#users').hide();
	$('#rez').hide();
	$('#odj').hide();
}
});

