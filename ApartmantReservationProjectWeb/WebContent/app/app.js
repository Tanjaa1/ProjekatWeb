const Search={template: '<search></search>'}
const Registration={template: '<reg-page></reg-page>'}
const router = new VueRouter({
	  mode: 'hash',
	  routes: [
	   { path: '/', component: Search},
	   { path: '/reg', component: Registration},
	   
	  ]
});

var app = new Vue({
	router,
	el: '#app',
	data:{
		reg:false,
		loginInformation:{}
	},
	methods:{
		login: function(loginInformation){
			alert(loginInformation.username);
			axios
				.post("rest/users/login", {params: {username:loginInformation.username,password:loginInformation.password}})
				.then(response => {
					if(this.user.username!=""){				
						alert("ULOGOVANI");
					}else{
						alert("Nije uspesno!");
					}
				} )
		},
		registracija: function(){
			alert("DADADAD");
			reg=true;
		}
	}	
});

