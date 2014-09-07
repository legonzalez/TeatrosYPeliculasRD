function cargarData(){
var tbldata = [];
var listadoDeCines = Alloy.Collections.instance('cine');
listadoDeCines.fetch();

for(var i=0;i< listadoDeCines.length;i++) {
	tbldata.push(Alloy.createController('cliente/rows/rowCine', {
		cine : {
			nombre : listadoDeCines.at(i).get('nombre'),
			telefono : listadoDeCines.at(i).get('telefono'),
			direccion : listadoDeCines.at(i).get('direccion'),
			identificador:listadoDeCines.at(i).get('identificador')
		}
	}).getView());
}
$.tblCines.data = tbldata;
}



Ti.App.addEventListener('dataDeCineCargada', function(e){
	cargarData();
});
cargarData();