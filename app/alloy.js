// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};
Alloy.Globals.Cloud = require('ti.cloud');
Alloy.Globals.SocialT = require('alloy/social').create({
    consumerSecret: '58hSfSQThA50MDk4XbjwXWblrnXKxeS2bZnEuAZzOiquSKzmT1',
    consumerKey: 'Pt0TamfxGAt3AyOIwrZdaMyFx'
});


var nube = Alloy.Globals.Cloud;
function definirGlobals(){
	Alloy.Globals.newData = {peliculas:[],cines:[],cinesPeliculas:[],obras:[],teatros:[],teatrosObras:[]};
	Alloy.Globals.usuarioLogeado = {nombre:null,apellido:null,usuario:null,email:null,tiUsuer:false,idUsuario:null};		
}
definirGlobals();
definirListeners();



Alloy.Globals.fbModule = require('facebook');
inicializarFbModule();
function inicializarFbModule(){
	Alloy.Globals.fbModule = require('facebook');
	var fb = Alloy.Globals.fbModule;
	fb.appid = '702388679841824';
	fb.permissions = ['public_profile','email','publish_stream','publish_actions'];
	fb.forceDialogAuth = false;
	fb.addEventListener('login',function(event){
		if(event.success){
			alert("logout Done");
			fb.requestWithGraphPath('me', {}, 'GET', function(e) {
			    if (e.success) {
			       Ti.API.info(JSON.stringify(e.result));
			    } else if (e.error) {
			       Ti.API.info(JSON.stringify(e.error));
			    } else {
			        Ti.API.info('Unknown response');
			    }
			});
		}
	});
	
//	fb.authorize();
		
	fb.addEventListener('logout',function(event){
		alert("logout Done");
	});
}



Alloy.Globals.shareF = function shareFacebook(msg){
	Alloy.Globals.fbModule.requestWithGraphPath('me/feed',
		{message:msg},
		'POST',
		function(event){
			if(event.success){
				 Ti.API.info(JSON.stringify(event.result));
				alert('Compartido con Exito');
			}else if (event.error) {
			       Ti.API.info(JSON.stringify(event.error));
			} else {
			        Ti.API.info('Unknown response');
			}
		});
};

Alloy.Globals.shareT = function shareTwitter(msg){
	Alloy.Globals.SocialT.share({
    	message: msg,
    	success: function(e) {alert('Compartido con Exito')},
    	error: function(e) {alert('Error!')}
	});
};






if (OS_ANDROID) {
	Alloy.Globals.Android = {
		"Api" : Ti.Platform.Android.API_LEVEL
	};
}

	
Alloy.Globals.actualizarData = function actualizarData() {
	Titanium.API.info("versionDeLosDatos from Titanium");
	 var versionDeLosDatos = {};
	nube.Objects.query({
    classname: 'versionDeLosDatos'
	}, function (e) {
			var dataOnDB = Alloy.Collections.instance('versionDeLosDatos');
			dataOnDB.fetch();
			//Titanium.API.info(dataOnDB.length+"--------------------------");
	    if (e.success) {
	        for (var i = 0; i < e.versionDeLosDatos.length; i++) {
	            var dataTemp = e.versionDeLosDatos[i];
	            versionDeLosDatos =Alloy.createModel('versionDeLosDatos', {
	            peliculas : dataTemp.peliculas,
				cines : dataTemp.cines,
				cinesPeliculas : dataTemp.cinesPeliculas,
				obras:dataTemp.obras,
				teatros:dataTemp.teatros,
				teatrosObras:dataTemp.teatrosObras,
				tiCloudID:dataTemp.id
				});				
	        }
			if (dataOnDB.length < 1) {
				Titanium.API.info("no data found");
				versionDeLosDatos.save();
				cargarDataDePeliculas();
				cargarDataDeCines();
				cargarDataDeCinesPeliculas();
				cargarDataDeObras();
				cargarDataDeTeatros();
				cargarDataDeTeatrosObras();
			}else if(versionDeLosDatos.get('peliculas') > dataOnDB.at(0).get('peliculas')){
				Titanium.API.info(dataOnDB.length+" update peliculas");
				dataOnDB.at(0).set('peliculas', versionDeLosDatos.get('peliculas'));
				dataOnDB.at(0).save();
				cargarDataDePeliculas();
			}else if(versionDeLosDatos.get('cines') > dataOnDB.at(0).get('cines')){
				dataOnDB.at(0).set('cines' ,versionDeLosDatos.get('cines'));
				dataOnDB.at(0).save();
				cargarDataDeCines();
			}else if(versionDeLosDatos.get('cinesPeliculas') > dataOnDB.at(0).get('cinesPeliculas')){
				dataOnDB.at(0).set('cinesPeliculas',versionDeLosDatos.get('cinesPeliculas'));
				dataOnDB.at(0).save();
				cargarDataDeCinesPeliculas();
			}else if(versionDeLosDatos.get('obras') > dataOnDB.at(0).get('obras')){
				dataOnDB.at(0).set('obras', versionDeLosDatos.get('obras'));
				dataOnDB.at(0).save();
				cargarDataDeObras();
			}else if(versionDeLosDatos.get('teatros') > dataOnDB.at(0).get('teatros')){
				dataOnDB.at(0).set('teatros',versionDeLosDatos.get('teatros'));
				dataOnDB.at(0).save();
				cargarDataDeTeatros();
			}else if(versionDeLosDatos.get('teatrosObras') > dataOnDB.at(0).get('teatrosObras')){
				dataOnDB.at(0).set('teatrosObras',versionDeLosDatos.get('teatrosObras'));
				dataOnDB.at(0).save();
				cargarDataDeTeatrosObras();
			}			
	    } else {
	        Titanium.API.info('Error:' + JSON.stringify(e));
	        alert('No fue posible actualizar los Datos, for favor asegúrese de tener acceso a internet');
	    }
	});	
}


Alloy.Globals.actualizarData();

function cargarDataDePeliculas() {
	Titanium.API.info("inicializarListadoDePeliculas from Titanium");
	nube.Objects.query({
    classname: 'pelicula'
	}, function (e) {
	    if (e.success) {
	        for (var i = 0; i < e.pelicula.length; i++) {
	            var dataTemp = e.pelicula[i];
	            var votos = 0;
	            var stars = 0;
	            if(dataTemp.reviews_count){
	            	votos = dataTemp.reviews_count;
	            }
	            if(dataTemp.ratings_average){
	            	if(parseInt(dataTemp.ratings_average) > 0){
	            		stars = parseInt(dataTemp.ratings_average); 
	            	}
	            }
	            
	            var currentData = Alloy.createModel('pelicula', {
					identificador:dataTemp.identificador,
					generos :dataTemp.generos,
					trailer :dataTemp.trailer,
					sinopsis :dataTemp.sinopsis,
					titulo :dataTemp.titulo,
					duracion :dataTemp.duracion,
					stars :stars,
					votos :votos,
					tiCloudID:dataTemp.id
				});
				Alloy.Globals.newData.peliculas.push(currentData);
			if(!(typeof dataTemp.photo === "undefined")){              
               var portada = dataTemp.photo;
				var xhr = Titanium.Network.createHTTPClient({
					onload: function() {
						// first, grab a "handle" to the file where you'll store the downloaded data
						var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,portada.filename);
						f.write(this.responseData); // write to the file
						Ti.App.fireEvent('graphic_downloaded', {filepath:f.nativePath,data:currentData});
					},
					timeout: 10000
				});
				xhr.open('GET',portada.urls.small_240);
				xhr.send();
				
				Ti.App.addEventListener('graphic_downloaded', function(e) {
					// you don't have to fire an event like this, but perhaps multiple components will
					// want to know when the image has been downloaded and saved
					e.data.set("portada",e.filepath);
					e.data.save();
					Ti.App.fireEvent('nuevaDataDePeliculaDelServer');
				});              
				
				 }
				
				
				
								
	        }
	        Titanium.API.info('Recived data de peliculas del server');
	        Ti.App.fireEvent('nuevaDataDePeliculaDelServer');
	    } else {
	        Titanium.API.info('Error:' + JSON.stringify(e));
	    }
	});	
}


function cargarDataDeCines() {
	Titanium.API.info("inicializarListadoDeCines  from Titanium");
	nube.Objects.query({
    classname: 'cine'
	}, function (e) {
	    if (e.success) {
	        for (var i = 0; i < e.cine.length; i++) {
	            var dataTemp = e.cine[i];
	            Alloy.Globals.newData.cines.push(Alloy.createModel('cine', {
					identificador:dataTemp.identificador,
					nombre :dataTemp.nombre,
					telefono :dataTemp.telefono,
					direccion :dataTemp.direccion,
					tiCloudID:dataTemp.id
				}));				
	        }
	        Ti.App.fireEvent('nuevaDataDeCineDelServer');
	    } else {
	        Titanium.API.info('Error:' + JSON.stringify(e));
	    }
	});	

}

function cargarDataDeCinesPeliculas() {
	Titanium.API.info("inicializarListadoDeCinesPeliculas  from Titanium");
	nube.Objects.query({
    classname: 'cinePelicula'
	}, function (e) {
	    if (e.success) {
	        for (var i = 0; i < e.cinePelicula.length; i++) {
	            var dataTemp = e.cinePelicula[i];
	           Alloy.Globals.newData.cinesPeliculas.push( Alloy.createModel('cinePelicula', {
					idPelicula : dataTemp.idPelicula  ,
					idCine : dataTemp.idCine,
					lunes : dataTemp.lunes,
					martes :dataTemp.martes,
					miercoles :dataTemp.miercoles,
					jueves :dataTemp.jueves,
					viernes :dataTemp.viernes,
					sabado :dataTemp.sabado,
					domingo :dataTemp.domingo,
					tiCloudID:dataTemp.id
			}));				
	        }
	        Ti.App.fireEvent('nuevaDataDeCinePeliculaDelServer');
	    } else {
	        Titanium.API.info('Error:' + JSON.stringify(e));
	    }
	});	

}

function cargarDataDeTeatros() {
	Titanium.API.info("inicializarListadoDeTeatros from Titanium");
	nube.Objects.query({
    classname: 'teatro'
	}, function (e) {
	    if (e.success) {
	        for (var i = 0; i < e.teatro.length; i++) {
	            var dataTemp = e.teatro[i];
	            Alloy.Globals.newData.teatros.push(Alloy.createModel('teatro', {
	            identificador : dataTemp.identificador,
				nombre : dataTemp.nombre,
				telefono : dataTemp.telefono,
				direccion : dataTemp.direccion,
				tiCloudID:dataTemp.id
				}));				
	        }
	        Ti.App.fireEvent('nuevaDataDeTeatroDelServer');
	    } else {
	        Titanium.API.info('Error:' + JSON.stringify(e));
	    }
	});	

}

function cargarDataDeTeatrosObras() {
	Titanium.API.info("inicializarListadoDeTeatrosObras from Titanium");
	nube.Objects.query({
    classname: 'teatroObra'
	}, function (e) {
	    if (e.success) {
	        for (var i = 0; i < e.teatroObra.length; i++) {
	            var dataTemp = e.teatroObra[i];
	            Alloy.Globals.newData.teatrosObras.push(Alloy.createModel('teatroObra', {
	            idObra : dataTemp.idObra,
				idTeatro : dataTemp.idTeatro,
				horarios : dataTemp.horarios,
				tiCloudID:dataTemp.id
				}));				
	        }
	        Ti.App.fireEvent('nuevaDataDeTeatroObraDelServer');
	    } else {
	        Titanium.API.info('Error:' + JSON.stringify(e));
	    }
	});	
}

function cargarDataDeObras() {
	Titanium.API.info("inicializarListadoDeObras from Titanium");
	nube.Objects.query({
    classname: 'obra'
	}, function (e) {
	    if (e.success) {
	        for (var i = 0; i < e.obra.length; i++) {
	            var dataTemp = e.obra[i];
	            var votos = 0;
	            var stars = 0;
	            if(dataTemp.reviews_count){
	            	votos = dataTemp.reviews_count;
	            }
	            if(dataTemp.ratings_average){
	            	if(parseInt(dataTemp.ratings_average) > 0){
	            		stars = parseInt(dataTemp.ratings_average); 
	            	}
	            }
 
	           var currentData = Alloy.createModel('obra', {
				identificador:dataTemp.identificador,
				generos : dataTemp.generos,
				trailer : dataTemp.trailer,
				sinopsis: dataTemp.sinopsis, 
				titulo : dataTemp.titulo,
				stars : stars,
				votos : votos,
				tiCloudID:dataTemp.id
               });
               Alloy.Globals.newData.obras.push(currentData);
               
               if(!(typeof dataTemp.photo === "undefined")){              
               var portada = dataTemp.photo;
				var xhr = Titanium.Network.createHTTPClient({
					onload: function() {
						// first, grab a "handle" to the file where you'll store the downloaded data
						var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,portada.filename);
						f.write(this.responseData); // write to the file
						Ti.App.fireEvent('graphic_downloaded', {filepath:f.nativePath,data:currentData});
					},
					timeout: 10000
				});
				xhr.open('GET',portada.urls.small_240);
				xhr.send();
				
				Ti.App.addEventListener('graphic_downloaded', function(e) {
					// you don't have to fire an event like this, but perhaps multiple components will
					// want to know when the image has been downloaded and saved
					e.data.set("portada",e.filepath);
					e.data.save();
					Ti.App.fireEvent('nuevaDataDeObrasRecibidaDelServer');
				});              
				
				 }
               				
	        }
	        
	       Ti.App.fireEvent('nuevaDataDeObrasRecibidaDelServer');
	    } else {
	        Titanium.API.info('Error:' + JSON.stringify(e));
	    }
	});	
}

function cleanDataBaseCines(){
	var db = Ti.Database.open('_alloy_');
	db.execute('DROP TABLE IF EXISTS cines;');
	db.execute('CREATE TABLE IF NOT EXISTS cines(identificador TEXT PRIMARY KEY, nombre TEXT, telefono TEXT,direccion TEXT,tiCloudID TEXT);');	
	db.close();
}
function cleanDataBaseCinesPeliculas(){
	var db = Ti.Database.open('_alloy_');
	db.execute('DROP TABLE IF EXISTS cinesPeliculas;');
	db.execute('CREATE TABLE IF NOT EXISTS cinesPeliculas(alloy_id TEXT, idPelicula TEXT, idCine TEXT, lunes TEXT, martes TEXT, miercoles TEXT, jueves TEXT, viernes TEXT, sabado TEXT, domingo TEXT,tiCloudID TEXT);');	
	db.close();		
}
function cleanDataBaseObras(){
	var db = Ti.Database.open('_alloy_');
	db.execute('DROP TABLE IF EXISTS obras;');
	db.execute('CREATE TABLE IF NOT EXISTS obras(identificador TEXT PRIMARY KEY, generos TEXT, trailer TEXT, sinopsis TEXT, titulo TEXT, stars INTEGER, votos INTEGER, portada TEXT,tiCloudID TEXT);');	
	db.close(); 
}
function cleanDataBasePeliculas(){
	var db = Ti.Database.open('_alloy_');
	db.execute('DROP TABLE IF EXISTS peliculas;');
	db.execute('CREATE TABLE IF NOT EXISTS peliculas(identificador TEXT PRIMARY KEY, generos TEXT, trailer TEXT, sinopsis TEXT, titulo TEXT, duracion TEXT, stars INTEGER, votos INTEGER, portada TEXT,tiCloudID TEXT);');	
	db.close();
}
function cleanDataBaseTeatros(){
	var db = Ti.Database.open('_alloy_');
	db.execute('DROP TABLE IF EXISTS teatros;');
	db.execute('CREATE TABLE IF NOT EXISTS teatros(identificador TEXT PRIMARY KEY, nombre TEXT, telefono TEXT, direccion TEXT,tiCloudID TEXT);');	
	db.close();
}
function cleanDataBaseTeatrosObras(){
	var db = Ti.Database.open('_alloy_');
	db.execute('DROP TABLE IF EXISTS teatrosObras;');
	db.execute('CREATE TABLE IF NOT EXISTS teatrosObras(alloy_id TEXT, idObra TEXT, idTeatro TEXT, horarios TEXT,tiCloudID TEXT);');	
	db.close();		
}


function definirListeners(){
	Ti.App.addEventListener('nuevaDataDePeliculaDelServer', function(e){
		var data = Alloy.Globals.newData.peliculas;
		if(data.length > 0){
			cleanDataBasePeliculas();
			for(var i=0;i< data.length;i++) {
				data[i].save();
			}
			Ti.App.fireEvent('dataDePeliculaCargada');	
		}
	});
	Ti.App.addEventListener('nuevaDataDeCineDelServer', function(e){
		var data = Alloy.Globals.newData.cines;
		if(data.length > 0){
			cleanDataBaseCines();	
			for(var i=0;i< data.length;i++) {
				data[i].save();
			}
			Ti.App.fireEvent('dataDeCineCargada');
		}
	});
	Ti.App.addEventListener('nuevaDataDeCinePeliculaDelServer', function(e){
		var data = Alloy.Globals.newData.cinesPeliculas;
		if(data.length > 0){
			cleanDataBaseCinesPeliculas();
			for(var i=0;i< data.length;i++) {
				data[i].save();
			}
		}
	});
	Ti.App.addEventListener('nuevaDataDeTeatroDelServer', function(e){
		var data = Alloy.Globals.newData.teatros;
		if(data.length > 0){
			cleanDataBaseTeatros();
			for(var i=0;i< data.length;i++) {
				data[i].save();
			}
			Ti.App.fireEvent('dataDeTeatroCargada');
		}
	});
	Ti.App.addEventListener('nuevaDataDeTeatroObraDelServer', function(e){
		var data = Alloy.Globals.newData.teatrosObras;
		if(data.length > 0){
			cleanDataBaseTeatrosObras();
			for(var i=0;i< data.length;i++) {
				data[i].save();
			}
		}
	});
	Ti.App.addEventListener('nuevaDataDeObrasRecibidaDelServer', function(e){
		var data = Alloy.Globals.newData.obras;
		if(data.length > 0){
			cleanDataBaseObras();
			for(var i=0;i< data.length;i++) {
				data[i].save();
			}
			Ti.App.fireEvent('dataDeObrasCargada');
		}
	});
}