Vue.component("addApartment", {
	data:function(){
		return{
			
		}
	},
    template: ` 
    <div class="add">
        <form>
            <h3>
                Kreiranje novog apartmana
            </h3>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="inputTip">Tip objekta</label>
                    <select class="custom-select">
                        <option selected>Izaberite tip</option>
                        <option value="1">Ceo apartman</option>
                        <option value="2">Soba</option>
                    </select>
                </div>
                <div class="form-group col-md-3">
                    <label for="inputSoba">Broj soba</label>
                    <input type="number" class="form-control" id="inputSoba">
                </div>
                <div class="form-group col-md-3">
                    <label for="inputGosti">Broj gostiju</label>
                    <input type="number" class="form-control" id="inputGosti">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="inputLongitude">Geografska širina</label>
                    <input type="text" class="form-control" id="inputLongitude">
                </div>
                <div class="form-group col-md-6">
                    <label for="inputLatitude">Geografska dužina</label>
                    <input type="text" class="form-control" id="inputLatitude">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="inputStreet">Ulica i broj</label>
                    <input type="text" class="form-control" id="inputStreet">
                </div>
                <div class="form-group col-md-3">
                    <label for="inputCity">Grad</label>
                    <input type="text" class="form-control" id="inputCity">
                </div>
                <div class="form-group col-md-3">
                    <label for="inputZip">Poštanski broj</label>
                    <input type="number" class="form-control" id="inputZip">
                </div>
            </div>
            <button type="submit" class="btn btn-primary">Kreiraj</button>
        </form>
	</div>
    `
	
});