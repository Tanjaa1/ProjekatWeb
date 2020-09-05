Vue.component("reg-page", {	
	data: function(){
		return{
			regInformation:{}
		}
	},
	template: `
<div class="header">
	<form>
		<h1>
			Registracija
		</h1>
		<div class="form-box">
		<div class="form-group">
        <input type="text" class="form-control" placeholder="Ime *" value="" v-model="regInformation.name"/>
    </div>
    <div class="form-group">
        <input type="text" class="form-control" placeholder="Prezime *" value=""  v-model="regInformation.surname"/>
    </div>
    <div class="form-group">
        <input type="text" class="form-control" placeholder="Korisničko ime *" value="" v-model="regInformation.username"/>
    </div>
    <div class="form-group">
        <input type="password" class="form-control" placeholder="Lozinka *" value="" v-model="regInformation.password"/>
    </div>
    <div class="form-group">
        <input type="password" class="form-control"  placeholder="Potvrda lozinke*" value="" />
    </div>
    <div class="form-group" style="color:white">
        <div class="maxl">
            <label class="radio inline"> 
                <input type="radio" name="gender" value="male">
                <span> Muško </span> 
            </label>
            <label class="radio inline"> 
                <input type="radio" name="gender" value="female">
                <span>Žensko </span> 
            </label>
        </div>
    </div>
    <input type="submit" class="search-btn" v-on:click="registracija(regInformation)" value="Registruj se"/>
</div>
	    </div>
    </form>
</div>
`,
methods:{
	registracija: function(regInformation){
		
		var user = {username : regInformation.username, password : regInformation.password, name : regInformation.name, surname : regInformation.surname};
		axios
		.post("rest/users/add",user)
		.then(response => {
			alert(response.data);
		})
	}
}
});