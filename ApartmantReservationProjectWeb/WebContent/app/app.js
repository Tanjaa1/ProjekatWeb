const Search={template: '<search></search>'}
const SideBar={template: '<side-bar></side-bar>'}
const ApartmentView={template: '<apartment></apartment>'}
const AddAparment={template: '<addApartment></addApartment>'}
const HostApartments={template: '<host-apartments></host-apartments>'}
const EditApartment={template: '<editApartment></editApartment>'}
const AdminApartments={template: '<admin-apartments></admin-apartments>'}
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
	   { path: '/adminapartments', component : AdminApartments},
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
		username:'',
		password:'',
		user:null
	},
	
	methods:{
		login: function(loginInformation){
			axios
			.post('rest/users/login',{
				Username:this.username,
				Password:this.password
			})
			.then(responese=>{
				this.user=response.data
				
			})
			.catch(e=>{
				if(e.response.status==400){
					alert("Pogresni login podaci")
				}
			})
			location.reload()
			

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
			$('#allApartments').hide();
			$('#sadrzaj').hide();
			$('#rez').hide();
			$('#odj').hide();
			$('#registr').show();
			$('#prijava').show();
		})
	},
	Provera: function(){
		axios
		.get("rest/users/getRole")
		.then(response => {			
			if(response.data!="Guest"){
				$('#userInfo').hide();
				$('#users').hide();
				$('#apartments').hide();
				$('#myApartments').hide();
				$('#allApartments').hide();
				$('#rez').hide();
				$('#sadrzaj').hide();
			} else {
				$('#userInfo').show();
				$('#users').hide();
				$('#apartments').show();
				$('#allApartments').hide();
				$('#myApartments').hide();
				$('#rez').show();
				$('#sadrzaj').hide();
			}
			if(response.data!="Administrator"){
				$('#users').hide();
				$('#sadrzaj').hide();
				$('#allApartments').hide();
			} else {
				$('#userInfo').show();
				$('#users').show();
				$('#apartments').hide();
				$('#allApartments').show();
				$('#myApartments').hide();
				$('#rez').show();
				$('#sadrzaj').show();
			}
			if(response.data!="Host"){
				$('#myApartments').hide();
			} else {
				$('#userInfo').show();
				$('#users').hide();
				$('#apartments').show();
				$('#allApartments').hide();
				$('#myApartments').show();
				$('#rez').show();
				$('#sadrzaj').hide();
			}
		})
	}
},
mounted() {
	axios
	.get('rest/users/currentUser')
	.then(response=>{
		
		if(response.data!=""){
			this.user=response.data
			$('#prijava').hide();
			$('#registr').hide();
			$('#odj').show();
			this.Provera();
			
		}else {
			$('#prijava').show();
			$('#registr').show();
			$('#odj').hide();
			$('#userInfo').hide();
			$('#users').hide();
			$('#apartments').hide();
			$('#myApartments').hide();
			$('#allApartments').hide();
			$('#rez').hide();
			$('#sadrzaj').hide();
			}
	})

	
	
}
});

