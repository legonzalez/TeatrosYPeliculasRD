var args = arguments[0] || {};
var cinePelicula = (args.cinePelicula) ? args.cinePelicula :{};
var listadoDeCines = Alloy.Collections.instance('cine');
listadoDeCines.fetch();
var cine = listadoDeCines.get(cinePelicula.get('idCine'));

$.filaCine.modelId = cine.get('identificador') || '';
$.nombre.text =cine.get('nombre') || '';
$.lun.text = cinePelicula.get('lunes') || '';
$.mar.text = cinePelicula.get('martes') || '';
$.mier.text = cinePelicula.get('miercoles')|| '';
$.jue.text = cinePelicula.get('jueves') || '';
$.vie.text = cinePelicula.get('viernes') || '';
$.sab.text = cinePelicula.get('sabado') || '';
$.dom.text = cinePelicula.get('domingo') || '';

$.filaCine.addEventListener('click', function(e) {
	var detailContorller = Alloy.createController('cliente/detalles/cine',{
        cine : listadoDeCines.get($.filaCine.modelId)
    });
	detailContorller.getView().open();
});
