const StartPage = { template: '<start-page></start-page>' }
const router = new VueRouter({
	  mode: 'hash',
	  routes: [
	   { path: '/', component: StartPage},
	  ]
});

var app = new Vue({
	router,
	el: '#startPage',
});

//var login=new Vue({
//	el:"#login",
//	data:{
//		loginInformation:{},
//		user : null,
//	},
//})
