const Search={template: '<search></search>'}
const AddApp={template: '<addApartment></addApartment>'}
const router = new VueRouter({
	  mode: 'hash',
	  routes: [
	   { //path: '/', component: Search},
	   		path: '/', component: AddApp},
	   
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
				.get("rest/users/login", {params: {username:loginInformation.username,password:loginInformation.password}})
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

