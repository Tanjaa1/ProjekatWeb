Vue.component("reg-page", {	
	data: function(){
		return{
			regInformation:{}
		}
	},
	template: `
	<div class="container register">
    <div class="row">
        <div class="col-md-9 register-left">
            <div class="tab-content" id="myTabContent">
                <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                    <h3 class="register-heading" style="color:#5c6ac4;"><b>Registracija</b></h3>
                    <div class="row register-form">
                        <div class="col-md-6">
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
                            <div class="form-group">
                                <div class="maxl">
                                    <label class="radio inline"> 
                                        <input type="radio" name="gender" value="male" checked>
                                        <span> Muško </span> 
                                    </label>
                                    <label class="radio inline"> 
                                        <input type="radio" name="gender" value="female">
                                        <span>Žensko </span> 
                                    </label>
                                </div>
                            </div>
                            <input type="submit" class="btn btn-primary"  value="Registruj se"/>
                        </div>
                    </div>
                </div>                            
            </div>
        </div>
    </div>

</div>
`
});