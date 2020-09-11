const Search={template: '<search></search>'}
const SideBar={template: '<side-bar></side-bar>'}
const ApartmentView={template: '<apartment></apartment>'}
const AddApp={template: '<addApartment></addApartment>'}
const Registration={template: '<reg-page></reg-page>'}
const Profile={template: '<user-info></user-info>'}
const Users={template: '<users></users>'}
const router = new VueRouter({
	  mode: 'hash',
	  routes: [
	   { path: '/', component: Search},
	   { path: '/reg', component: Registration},
	   { path: '/profile', component: Profile},
	   { path: '/users', component: Users}

	   	//path: '/', component: AddApp},
	   
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
					$('#rez').show();
					$('#prijava').hide();
					$('#registr').hide();
					$('#odj').show();
				},
				error: function(message) {
					alert("Pogrešno ime ili lozinka!");
				}
			});
		},
	Odjava: function(){
		axios
		.post("rest/users/logout")
		.then(response => {
			$('#userInfo').hide();
			$('#users').hide();
			$('#rez').hide();
			$('#odj').hide();
			$('#registr').show();
			$('#prijava').show();
		})
	}
},
mounted() {
	$('#userInfo').hide();
	$('#users').hide();
	$('#rez').hide();
	$('#odj').hide();
}
});

