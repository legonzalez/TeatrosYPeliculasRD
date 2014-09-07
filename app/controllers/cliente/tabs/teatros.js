function cargarData(){
var tbldata = [];
var listadoDeTeatros = Alloy.Collections.instance('teatro');
listadoDeTeatros.fetch();

for(var i=0;i< listadoDeTeatros.length;i++) {
	tbldata.push(Alloy.createController('cliente/rows/rowTeatro', {
		teatro : {
			nombre : listadoDeTeatros.at(i).get('nombre'),
			telefono : listadoDeTeatros.at(i).get('telefono'),
			direccion : listadoDeTeatros.at(i).get('direccion'),
			identificador:listadoDeTeatros.at(i).get('identificador')
		}
	}).getView());
}

/*
tbldata.push(Alloy.createController('cliente/rows/rowTeatro', {
	teatro : {
		nombre : 'Acrópolis Center [CC]',
		telefono : '(809)955-1010',
		direccion : 'Av. Winston Churchill | Torre Acrópolis - 4to. Piso Santo Domingo',
	}
}).getView());

tbldata.push(Alloy.createController('cliente/rows/rowTeatro', {
	teatro : {
		nombre : 'Bella Vista [PDC]',
		telefono : '(809)255-0921',
		direccion : 'Av. Sarasota | Plaza Bella Vista Mall. Santo Domingo',
	}
}).getView());

tbldata.push(Alloy.createController('cliente/rows/rowTeatro', {
	teatro : {
		nombre : 'Casa de Teatro (La Videoteca)',
		telefono : '',
		direccion : 'República Dominicana Santo Domingo',
	}
}).getView());


tbldata.push(Alloy.createController('cliente/rows/rowTeatro', {
	teatro : {
		nombre : 'Hollywood Plaza [CC | Romana]',
		telefono : '(809)556-1616',
		direccion : 'Carr. Romana / San Pedro Km. 2 1/2 La Romana',
	}
}).getView());

*/
$.tblTeatros.data = tbldata;
}



Ti.App.addEventListener('dataDeTeatroCargada', function(e){
	cargarData();
});
cargarData();

