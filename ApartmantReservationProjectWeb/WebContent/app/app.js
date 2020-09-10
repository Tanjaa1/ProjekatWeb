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
				},
				error: function(message) {
					alert("Pogrešno ime ili lozinka!");
				}
			});
		}
	},
	mounted() {
		$('#userInfo').hide();
		$('#users').hide();
		$('#rez').hide();
	}
});

