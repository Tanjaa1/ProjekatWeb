const Search={template: '<search></search>'}
const SideBar={template: '<side-bar></side-bar>'}
const ApartmentView={template: '<apartment></apartment>'}
const AddApp={template: '<addApartment></addApartment>'}
const Registration={template: '<reg-page></reg-page>'}
const router = new VueRouter({
	  mode: 'hash',
	  routes: [
	   { path: '/', component: AddApp},
	   { path: '/reg', component: Registration},
	   {path:'/apartment/:id',component:ApartmentView}
	   //{ path: '/addApartment', component: AddApp}
	   
	  ]
});

var app = new Vue({
	router,
	el: '#app',
	data:{
		regg:false,
		loginInformation:{}
	},
	methods:{
		login: function(loginInformation){
			axios
				.get("rest/users/login", {params: {username : this.loginInformation.username,password : this.loginInformation.password}})
				.then(response => {
					if(response.data.getUsername()!=""){
						regg=true
					}else{
					}
				} )
		},
	}	
});

