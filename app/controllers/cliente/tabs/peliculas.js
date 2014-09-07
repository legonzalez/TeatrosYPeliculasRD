function cargarData(){
	var tbldata = [];
	var listadoDePeliculas = Alloy.Collections.instance('pelicula');
	listadoDePeliculas.fetch();
	
	for(var i=0;i< listadoDePeliculas.length;i++) {
		//Titanium.API.info();
		tbldata.push(Alloy.createController('cliente/rows/rowPelicula', {
		pelicula : {
			titulo : listadoDePeliculas.at(i).get('titulo'),
			duracion : listadoDePeliculas.at(i).get('duracion'),
			stars : listadoDePeliculas.at(i).get('stars'),
			votos : listadoDePeliculas.at(i).get('votos'),
			portada : listadoDePeliculas.at(i).get('portada'),
			identificador:listadoDePeliculas.at(i).get('identificador'),
		},
		rownum : (i == (listadoDePeliculas.length -1)) ? 'last': i
		}).getView());
	}
	$.theTable.data = tbldata;
}
$.theTable.addEventListener('click', function(e) {
	//Ti.API.info('Source: ' + JSON.stringify(e.source));
	switch(e.source.portada) {
		case 'blue':
			e.source.image = '/images/notificationUnreadBadge.png';
			e.source.portada = 'red';
			break;
		case 'red':
			e.source.image = '/images/notificationBadge.png';
			e.source.portada = 'blue';
			break;
	}
});

Ti.App.addEventListener('dataDePeliculaCargada', function(e){
	cargarData();
});

cargarData();
