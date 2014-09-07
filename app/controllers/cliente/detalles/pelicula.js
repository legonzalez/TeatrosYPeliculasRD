/* area de inicializacion de los componentes visuales*/

var args = arguments[0] || {};
var pelicula = (args.pelicula) ? args.pelicula : {};
nube = Alloy.Globals.Cloud;
var dataOnDB = Alloy.Collections.instance('versionDeLosDatos');
dataOnDB.fetch();
var datosString ='Pelicula: ';
//Ti.API.info(JSON.stringify(args));
//Ti.API.info(JSON.stringify(pelicula));
$.verTrailer.addEventListener('click', function(e) {
	if (e.source.url) {
		Titanium.Platform.openURL(e.source.url);
	} else {
		alert('Por el momento no hay trailer disponible para esta Película');
	}
});
Ti.App.addEventListener('usuarioSeALogeado', function(e){
	showFromAgregarCometario();
});
Ti.App.addEventListener('usuarioSeADeslogeado', function(e){
	//showMsjLoginParaAgregarCometario();
});
$.btnLoginFromComentarios.addEventListener('click', function(e) {
	Alloy.createController('usuarios/login').getView().open();
});
$.btnRegistrarteFromComentarios.addEventListener('click', function(e) {
	Alloy.createController('usuarios/registrarse').getView().open();
});
$.btnNuevoComentario.addEventListener('click', function(e) {
	showFormComentar();
});

$.verTandas.addEventListener('click', function(e) {
	$.scrollableContainer.setCurrentPage(2);
});

$.btnComentar.addEventListener('click', function(e) {
	if(mostrarVotacion()){
		hideFormComentar();	
	}	
});

$.btnVerDetalle.addEventListener('click', function(e) {
	verDetalles();
});

$.btnverCometarios.addEventListener('click', function(e) {
	verComentarios();
});

/* area de definicion de las funciones de este controlador*/
function inicializarComponentes(pelicula) {
	$.detalleDePelicula.modelId  = pelicula.get('identificador')||'';
	$.detalleDePelicula.tiCloudID  = pelicula.get('tiCloudID')||'';
	$.titulo.text = pelicula.get('titulo') || 'Titulo';
	$.generos.text = pelicula.get('generos')|| 'Generos';
	$.verTrailer.url = pelicula.get('trailer') || '';
	$.sinopsis.value = pelicula.get('sinopsis') || '';
	$.duracion.text = (pelicula.get('duracion') ) ? 'Duración: ' + pelicula.get('duracion') : 'Duración: 0hr';
	$.leftImage.image = (pelicula.get('portada')!='default.jpg') ? pelicula.get('portada') : '/images/portadas/default.jpg';
	$.stars.image = (pelicula.get('stars') ) ? '/images/stars/' + pelicula.get('stars') + 'star.png' : '/images/stars/0star.png';
	$.votos.text = (pelicula.get('stars') ) ? '(' + pelicula.get('votos') + ')' : '(0)';
	datosString+=pelicula.get('titulo')+"- Rating: "+pelicula.get('stars')+" Estrellas -> TeatrosYPeliculasRD descargala ya!";
	getComentarios();
	cargarTandas();
	
	
}

function verDetalles() {
	$.scrollableContainer.setCurrentPage(0);
}

function verComentarios() {
	$.scrollableContainer.setCurrentPage(1);
}

function mostrarVotacion(){
	//get the selected value on the votacion
	//Titanium.API.info($.votacion.getSelectedRow(0).getTitle());
	if($.votacion.getSelectedRow(0).getTitle() =="Puntuacion"){
		alert('Por favor eleguir una puntuacion');
		return false;
	}
	if($.txtComentario.getValue() ==""){
		alert('Por favor escriba un comentario');
		return false;		
	}
	nube.Reviews.create({
	    custom_object_id: $.detalleDePelicula.tiCloudID,
	    rating: parseInt($.votacion.getSelectedRow(0).getTitle()),
	    content: $.txtComentario.getValue()
	}, function (e) {
	    if (e.success) {
	        Titanium.API.info("Nuevo comentario Agregado");
	        getComentarios();
	        actualizarVersionDeLosDatos();
	    } else {
	        alert('Error:\n' +
	            ((e.error && e.message) || JSON.stringify(e)));
	    }
	});	
	return true;
}

function actualizarVersionDeLosDatos(){
	nube.Objects.update({
	    classname: 'versionDeLosDatos',
	    id: dataOnDB.at(0).get("tiCloudID"),
	    fields: {
	        peliculas: (dataOnDB.at(0).get('peliculas')+1)
	    }
	}, function (e) {
	    if (e.success) {
	    	Alloy.Globals.actualizarData();
	    } else {
	        alert('Error:\n' +
	            ((e.error && e.message) || JSON.stringify(e)));
	    }
	});
}

function showFromAgregarCometario() {
	$.lblNombreUsuario.text =Alloy.Globals.usuarioLogeado.usuario;
	$.nuevoComentarioVisitante.setVisible(false);
	$.nuevoComentarioUsuario.setVisible(true);
	hideFormComentar();
}

function showMsjLoginParaAgregarCometario() {
	$.nuevoComentarioVisitante.setVisible(true);
	$.nuevoComentarioUsuario.setVisible(false);
}

function showFormComentar() {
	$.lblNombreUsuario.setVisible(true);
	$.lblNombreUsuario.setVisible(true);
	$.txtComentario.setVisible(true);
	$.btnComentar.setVisible(true);
	$.btnNuevoComentario.setVisible(false);
	$.btnVerDetalle.setVisible(false);
	$.votacion.setVisible(true);
	$.tblComentarios.top = 310;
}

function hideFormComentar() {
	$.lblNombreUsuario.setVisible(false);
	$.lblNombreUsuario.setVisible(false);
	$.txtComentario.setVisible(false);
	$.btnComentar.setVisible(false);
	$.btnNuevoComentario.setVisible(true);
	$.btnVerDetalle.setVisible(true);
	$.votacion.setVisible(false);
	$.tblComentarios.top = 85;
}

function getComentarios(){
	nube.Reviews.query({
    custom_object_id: $.detalleDePelicula.tiCloudID
}, function (e) {
	var comentarios = [];
    if (e.success) {
        for (var i = 0; i < e.reviews.length; i++) {
            var review = e.reviews[i];
            comentarios.push({nombreUsuario:review.user.username,fecha:review.updated_at.substr(0,10), comentario:review.content});
        }
        cargarComentarios(comentarios);
    } 
});
}


function cargarComentarios(comentarios) {
	var tbldata = [];
	if(comentarios){
		 for (var i = 0; i < comentarios.length; i++) {
		 		tbldata.push(Alloy.createController('cliente/rows/rowComentario', {
				comentario : {
					nombreUsuario :comentarios[i].nombreUsuario,
					fecha : comentarios[i].fecha,
					comentario : comentarios[i].comentario
				}
			}).getView());
		 }	
	}
	$.tblComentarios.data = tbldata;
}

function cargarTandas(){
	var tbldata = [];
	var cinesPeliculas = Alloy.Collections.instance('cinePelicula');
	cinesPeliculas.fetch();
	var peliculasPorCine = cinesPeliculas.where({idPelicula:$.detalleDePelicula.modelId});
	for(var i=0;i< peliculasPorCine.length;i++) {
		tbldata.push(Alloy.createController('cliente/rows/tandas/rowCine', {
			cinePelicula : peliculasPorCine[i]
		}).getView());
	}
	$.tblTandas.data = tbldata;
 }
 
 function showOptions(){
   if(Alloy.Globals.SocialT.isAuthorized()) {
		Alloy.Globals.shareT(datosString);
	}else if(Alloy.Globals.fbModule.getLoggedIn()) {
    	Alloy.Globals.shareF(datosString);
   }else{
    	$.dialog.show();   	
   }
}
$.dialog.addEventListener( 'click', function(e){
	 if(e.source.selectedIndex == 0){
	 	Alloy.Globals.SocialT.authorize(function(){
	 		Alloy.Globals.shareT(datosString);
	 	});
	 }else if(e.source.selectedIndex == 1){
	 	Alloy.Globals.fbModule.addEventListener('login',function(event){
			if(event.success){
				Alloy.Globals.shareF(datosString);	
				}else if (event.error) {
				Ti.API.info(JSON.stringify(event.error));
			} else {
			Ti.API.info('Unknown response');
		}
		});
	 	Alloy.Globals.fbModule.authorize();	
	 }
	 e.source.selectedIndex = -1;
});





/*
 mostrando el formulario de agregar comentario dependiendo si el usuario esta logeado o no
 * */
if (Alloy.Globals.usuarioLogeado.usuario == null) {
	showMsjLoginParaAgregarCometario();
}else{
	showFromAgregarCometario();
}

inicializarComponentes(pelicula);

$.detalleDePelicula.open();
