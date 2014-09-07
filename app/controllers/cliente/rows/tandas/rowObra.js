var args = arguments[0] || {};
var teatroObra = (args.teatroObra) ? args.teatroObra :{};

var listadoDeObras = Alloy.Collections.instance('obra');
listadoDeObras.fetch();
var obra = listadoDeObras.get(teatroObra.get('idObra'));

$.filaObra.modelId = obra.get('identificador') || '';
$.titulo.text =obra.get('titulo') || '';
$.leftImage.image =   (obra.get('portada')!='default.jpg') ?obra.get('portada') : '/images/portadas/default.jpg';
$.horarios.text = (teatroObra.get('horarios') ) ?" "+teatroObra.get('horarios') : '';

$.filaObra.addEventListener('click', function(e) {
	var detailContorller = Alloy.createController('cliente/detalles/obra',{
        obra : listadoDeObras.get($.filaObra.modelId)
    });
	detailContorller.getView().open();
});



