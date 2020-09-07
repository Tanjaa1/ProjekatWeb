const Search={template: '<search></search>'}
const SideBar={template: '<side-bar></side-bar>'}
//const AddApp={template: '<addApartment></addApartment>'}
const Registration={template: '<reg-page></reg-page>'}
const router = new VueRouter({
	  mode: 'hash',
	  routes: [
	   { path: '/', component: SideBar},
	   { path: '/reg', component: Registration}

	   	//path: '/', component: AddApp},
	   
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
			alert("l");
			axios
				.post("rest/users/login", {params: {username:loginInformation.username,password:loginInformation.password}})
				.then(response => {
					if(response.data.getUsername()!=""){
						regg=true;
						alert("ULOGOVANI");
					}else{
						alert("Nije uspesno!");
					}
				} )
		}
	}	
});

