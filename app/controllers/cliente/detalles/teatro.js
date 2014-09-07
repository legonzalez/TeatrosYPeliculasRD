var args = arguments[0] || {};
var teatro = (args.teatro) ? args.teatro :{};


function inicializarComponentes(teatro){
	$.nombre.text =teatro.get('nombre') || '';
	$.telefono.text = (teatro.get('telefono') ) ? 'Tel.:'+teatro.get('telefono') : 'Tel.:(000)000-0000';
	$.direccion.text = (teatro.get('direccion') ) ? 'Dirección:'+teatro.get('direccion') : 'Dirección:';
	$.detalleDeTeatro.modelId = teatro.get('identificador') || '';
}


function cargarTandas(){
	var tbldata = [];
	var teatrosObras = Alloy.Collections.instance('teatroObra');
	teatrosObras.fetch();
	var obrasPorTeatro = teatrosObras.where({idTeatro:$.detalleDeTeatro.modelId});
	for(var i=0;i< obrasPorTeatro.length;i++) {
		tbldata.push(Alloy.createController('cliente/rows/tandas/rowObra', {
			teatroObra : obrasPorTeatro[i]
		}).getView());
	}
	
	if(obrasPorTeatro.length > 0){
		$.noHayTandas.setVisible(false);
	}
	$.tblObras.data = tbldata;
 }
 
 
 inicializarComponentes(teatro);
 cargarTandas();
$.detalleDeTeatro.open();
