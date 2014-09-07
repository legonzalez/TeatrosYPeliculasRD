var args=arguments[0]|| {};
var cine=(args.cine)?args.cine: {};
var listadoDeCines = Alloy.Collections.instance('cine');
listadoDeCines.fetch();
$.filaCine.modelId=cine.identificador||'';
$.nombre.text=cine.nombre||'';
$.telefono.text=(cine.telefono )?'Tel.:'+cine.telefono:'Tel.:(000)000-0000';
$.direccion.text=(cine.direccion )?'Dirección:'+cine.direccion:'Dirección:';
$.filaCine.addEventListener('click', function(e) {
	
var detailContorller=Alloy.createController('cliente/detalles/cine', {
		cine: listadoDeCines.get($.filaCine.modelId)
	});
detailContorller.getView().open();
});
