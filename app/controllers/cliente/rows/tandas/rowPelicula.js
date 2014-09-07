var args = arguments[0] || {};
var cinePelicula = (args.cinePelicula) ? args.cinePelicula :{};

var listadoDePeliculas = Alloy.Collections.instance('pelicula');
listadoDePeliculas.fetch();
var pelicula = listadoDePeliculas.get(cinePelicula.get('idPelicula'));

$.filaPelicula.modelId = pelicula.get('identificador') || '';
$.titulo.text =pelicula.get('titulo') || '';
$.leftImage.image =   (pelicula.get('portada')!='default.jpg' ) ?pelicula.get('portada') : '/images/portadas/default.jpg';
$.lun.text =  (cinePelicula.get('lunes') ) ? " "+cinePelicula.get('lunes'): '';
$.mar.text = (cinePelicula.get('martes') ) ? " "+cinePelicula.get('martes'): '';  
$.mier.text = (cinePelicula.get('miercoles') ) ? " "+cinePelicula.get('miercoles'): '';
$.jue.text = (cinePelicula.get('jueves') ) ? " "+cinePelicula.get('jueves'): '';
$.vie.text = (cinePelicula.get('viernes') ) ? " "+cinePelicula.get('viernes'): '';
$.sab.text =(cinePelicula.get('sabado') ) ? " "+cinePelicula.get('sabado'): '';
$.dom.text =(cinePelicula.get('domingo') ) ? " "+cinePelicula.get('domingo'): '';


$.filaPelicula.addEventListener('click', function(e) {
	var detailContorller = Alloy.createController('cliente/detalles/pelicula',{
        pelicula : listadoDePeliculas.get($.filaPelicula.modelId)
    });
	detailContorller.getView().open();
});



