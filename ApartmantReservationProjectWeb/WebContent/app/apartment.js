Vue.component("apartment", {
	data: function () {
		return {
		}
	},
    template: ` 

    <div class="apartment">
        <div class="row">
            <div class="col-md-2 col-sm-12"></div>

            <div class="col-md-4 col-sm-12 mt-5 mb-4"> 
                <div id="carouselExampleControls" class="carousel slide mt-5" data-ride="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img class="d-block" width="610" height="450" src="images/soba.jpg" alt="Slika1">
                        </div>
                        <div class="carousel-item">
                            <img class="d-block" width="610" height="450" src="images/soba1.jpg" alt="Slika2">
                        </div>
                        <div class="carousel-item">
                            <img class="d-block" width="610" height="450" src="images/hotel.jpg" alt="Slika3">
                        </div>
                    </div>
                    <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>
            </div>        

            <div class="col-md-3 col-sm-12 mt-4 mb-4">
                <h4 style="text-align:center">Apartman 1</h4>
                <div class="border mt-2 mb-2 ml-2 mr-2">
                    <p class=" mt-2 mx-2"> 
                        <label>Tip objekta:</label>
                        <label>Soba</label>
                    </p>
                    <p class="mx-2">
                        <label>Broj soba:</label>
                        <label>Tri</label>
                    </p>
                    <p class="mx-2">
                        <label>Broj godtiju:</label>
                        <label>Dve</label>
                    </p>
                    <p class="mx-2">
                        <label>Adresa objekta:</label>
                        <p class="mx-2">Ulica 1</p>
                        <p class="mx-2">Grad</p>
                        <p class="mx-2">Postanski broj</p>
                        <p class="mx-2">Koordinate</p>
                    </p>
                    <p class="mx-2">
                        <label>Dostupni datumi:</label>
                    </p>
                    <p class="mx-2">
                        <label>Cena po noći:</label>
                    </p>
                    
                    <p class="mx-2">Vreme za prijavu: 2PM</p>
                    <p class="mx-2">Vreme za odjavu: 10AM</p>
                    </p>
                </div>
            </div>

            <div class="col-md-3 col-sm-12 mt-4 mb-4"> 
                <h4 style="text-align:center">Komentari</h4>
                <div class = "border"></div>
            </div>
        </div>
    </div>
    
    `
});

