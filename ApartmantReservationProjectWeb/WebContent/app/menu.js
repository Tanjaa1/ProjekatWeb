Vue.component("menu",{	
	data: function(){
		return{
		}
	},
	template: `
	</div>
<div class="left">
<div class="item">
    <i class="fas fa-fw fa-bars"></i>
</div>
<div class="item active">
    <i class="fas fa-fw fa-users"></i> Korisnici
</div>
<div class="item">
    <i class="fas fa-fw fa-bed"></i> Apartmani
</div>
<div class="item">
    <i class="fas fa-fw fa-flag"></i> Rezervacije
</div>
<div class="item">
    <i href="#/profile" class="fas fa-fw fa-user-circle"></i> Profil
</div>
</div>
`
});
