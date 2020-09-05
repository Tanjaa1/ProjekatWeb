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
        <input type="text" class="form-control" placeholder="Ime *" value="" />
    </div>
    <div class="form-group">
        <input type="text" class="form-control" placeholder="Prezime *" value="" />
    </div>
    <div class="form-group">
        <input type="text" class="form-control" placeholder="Korisničko ime *" value="" />
    </div>
    <div class="form-group">
        <input type="password" class="form-control" placeholder="Lozinka *" value="" />
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
    <input type="submit" class="search-btn" value="Registruj se"/>
</div>
	    </div>
    </form>
</div>
`
});