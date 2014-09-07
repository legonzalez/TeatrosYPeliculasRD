function cargarData(){
var tbldata = [];
var listadoDeObras = Alloy.Collections.instance('obra');
listadoDeObras.fetch();

for(var i=0;i< listadoDeObras.length;i++) {
	//Titanium.API.info(listadoDeObras.at(i).get('identificador'));
	tbldata.push(Alloy.createController('cliente/rows/rowObra', {
	obra : {
		titulo : listadoDeObras.at(i).get('titulo'),
		duracion : listadoDeObras.at(i).get('duracion'),
		stars : listadoDeObras.at(i).get('stars'),
		votos : listadoDeObras.at(i).get('votos'),
		portada : listadoDeObras.at(i).get('portada'),
		identificador:listadoDeObras.at(i).get('identificador'),
	},
	rownum : (i == (listadoDeObras.length -1)) ? 'last': i
	}).getView());
}








/*for(var i=0;i<8;i++) {
var row = Alloy.createController('cliente/rows/rowObra', {
primaryLabel: 'This is row ' + i,
subTitle: 'Subtitle ' + i,
rownum: i,
myImage: (i%2==0) ? 'a' : 'b'
}).getView();
tbldata.push(row);
} */// end for loop

/*tbldata.push(Alloy.createController('cliente/rows/rowObra', {
	obra : {
		titulo : 'X-Men days of future past',
		duracion : '2 hr',
		stars : 5,
		votos : '3,200',
		portada : 'xmen.jpg'
	},
	rownum : 0
}).getView());
tbldata.push(Alloy.createController('cliente/rows/rowObra', {
	obra : {
		titulo : 'Planet Of the Apes',
		duracion : '2 hr',
		stars : 3,
		votos : '200',
		portada : 'apesplanet.jpg'
	},
	rownum : 1
}).getView());
tbldata.push(Alloy.createController('cliente/rows/rowObra', {
	obra : {
		titulo : 'El que mucho abarca',
		duracion : '2 hrs',
		stars : 2,
		votos : '500',
		portada : 'elquemuchoabarca.jpg'
	},
	rownum : 2
}).getView());
tbldata.push(Alloy.createController('cliente/rows/rowObra', {
	obra : {
		titulo : 'The Fault',
		duracion : '1:30 hrs',
		stars : 0,
		votos : '0',
		portada : 'thefault.jpg'
	},
	rownum : 3
}).getView());

tbldata.push(Alloy.createController('cliente/rows/rowObra', {
	obra : {
		titulo : 'Transformers',
		duracion : '3:30 hrs',
		stars : 2,
		votos : '30',
		portada : 'transformers.jpg'
	},
	rownum : 'last'
}).getView());*/
$.theTable.data = tbldata;
}

$.theTable.addEventListener('click', function(e) {
	//Ti.API.info('Source: ' + JSON.stringify(e.source));
	switch(e.source.portada) {
		case 'blue':
			e.source.image = '/images/notificationUnreadBadge.png';
			e.source.portada = 'red';
			break;
		case 'red':
			e.source.image = '/images/notificationBadge.png';
			e.source.portada = 'blue';
			break;
	}
});


Ti.App.addEventListener('dataDeObrasCargada', function(e){
cargarData();
});
cargarData();