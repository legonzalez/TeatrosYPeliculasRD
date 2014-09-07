var args = arguments[0] || {};
var pelicula = (args.pelicula) ? args.pelicula :{};
var listadoDePeliculas = Alloy.Collections.instance('pelicula');
listadoDePeliculas.fetch();

$.filaPelicula.modelId =pelicula.identificador || '';
$.titulo.text =pelicula.titulo || '';
$.duracion.text = (pelicula.duracion ) ? 'Duración: '+pelicula.duracion : 'Duración: 0hr';
$.filaPelicula.num = args.num || '';
$.leftImage.image =   (pelicula.portada !='default.jpg') ? pelicula.portada : '/images/portadas/default.jpg';
$.leftImage.portada = pelicula.portada || '';
$.stars.image =  (pelicula.stars ) ?'/images/stars/'+pelicula.stars+'star.png':'/images/stars/0star.png';
$.votos.text = (pelicula.stars ) ?'('+pelicula.votos+')':'(0)';
$.rightImage.portada='blue';
if(args.rownum == 0) {
	$.filaPelicula.backgroundImage = '/images/topRow.png';
	$.filaPelicula.selectedBackgroundImage = '/images/topRowSelected.png';
} else if(args.rownum == 'last') {
	$.filaPelicula.backgroundImage = '/images/bottomRow.png';
	$.filaPelicula.top=7;
	$.filaPelicula.selectedBackgroundImage = '/images/bottomRowSelected.png';		
}

$.filaPelicula.addEventListener('click', function(e) {
	//Ti.API.info($.filaPelicula.modelId);
	//Ti.API.info(JSON.stringify(listadoDePeliculas.get($.filaPelicula.modelId)));
	var detailContorller = Alloy.createController('cliente/detalles/pelicula',{
        pelicula : listadoDePeliculas.get($.filaPelicula.modelId)
    });
	detailContorller.getView().open();
});
