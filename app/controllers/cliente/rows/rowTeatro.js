var args=arguments[0]|| {};
var teatro=(args.teatro)?args.teatro: {};
var listadoDeTeatros = Alloy.Collections.instance('teatro');
listadoDeTeatros.fetch();
$.filaTeatro.modelId=teatro.identificador||'';
$.nombre.text=teatro.nombre||'';
$.telefono.text=(teatro.telefono )?'Tel.:'+teatro.telefono:'Tel.:(000)000-0000';
$.direccion.text=(teatro.direccion )?'Dirección:'+teatro.direccion:'Dirección:';
$.filaTeatro.addEventListener('click', function(e) {
	
var detailContorller=Alloy.createController('cliente/detalles/teatro', {
		teatro: listadoDeTeatros.get($.filaTeatro.modelId)
	});
detailContorller.getView().open();
});
