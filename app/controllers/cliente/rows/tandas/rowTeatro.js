var args = arguments[0] || {};
var teatroObra = (args.teatroObra) ? args.teatroObra :{};
var listadoDeTeatros = Alloy.Collections.instance('teatro');
listadoDeTeatros.fetch();
var teatro = listadoDeTeatros.get(teatroObra.get('idTeatro'));

$.filaTeatro.modelId = teatro.get('identificador') || '';
$.nombre.text =teatro.get('nombre') || '';
$.horarios.text = (teatroObra.get('horarios') ) ?" "+teatroObra.get('horarios') : '';

$.filaTeatro.addEventListener('click', function(e) {
	var detailContorller = Alloy.createController('cliente/detalles/teatro',{
        teatro : listadoDeTeatros.get($.filaTeatro.modelId)
    });
	detailContorller.getView().open();
});
