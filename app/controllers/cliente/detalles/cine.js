var args = arguments[0] || {};
var cine = (args.cine) ? args.cine :{};


function inicializarComponentes(cine){
	$.nombre.text =cine.get('nombre') || '';
	$.telefono.text = (cine.get('telefono') ) ? 'Tel.:'+cine.get('telefono') : 'Tel.:(000)000-0000';
	$.direccion.text = (cine.get('direccion') ) ? 'Dirección:'+cine.get('direccion') : 'Dirección:';
	$.detalleDeCine.modelId = cine.get('identificador') || '';
}


function cargarTandas(){
	var tbldata = [];
	var cinesPeliculas = Alloy.Collections.instance('cinePelicula');
	cinesPeliculas.fetch();
	var peliculasPorCine = cinesPeliculas.where({idCine:$.detalleDeCine.modelId});
	for(var i=0;i< peliculasPorCine.length;i++) {
		tbldata.push(Alloy.createController('cliente/rows/tandas/rowPelicula', {
			cinePelicula : peliculasPorCine[i]
		}).getView());
	}
	
	if(peliculasPorCine.length > 0){
		$.noHayTandas.setVisible(false);
	}
	$.tblPeliculas.data = tbldata;
 }
 
 
 inicializarComponentes(cine);
 cargarTandas();
$.detalleDeCine.open();
