$.btnLogin.addEventListener('click', function(e){
	Ti.API.info("Login User");
	if($.txtUsuario.value.trim().length > 0 && $.txtClave.value.trim().length > 0){
		$.btnLogin.setVisible(false);
		Alloy.Globals.Cloud.Users.login({ 
	    login: $.txtUsuario.value.trim(),
	    password: $.txtClave.value.trim()
		}, function(e) {
		    if (e.success) {
		    	var user = e.users[0];
		        Ti.API.info("Logged in user, id = " + user.id + ", session ID = " + Alloy.Globals.Cloud.sessionId);
		        Alloy.Globals.usuarioLogeado = {nombre:user.first_name,apellido:user.last_name,usuario:user.username,email:user.email,tiUsuer:true,idUsuario:user.id};
		        Ti.App.fireEvent('usuarioSeALogeado');		        
		        $.login.close();
		    } else if(e.error){
		    	$.btnLogin.setVisible(true);
		    	alert('Fallo el Login, por favor revise su coneccion a internet');
		    } else {
		    	$.btnLogin.setVisible(true);
		    	Ti.API.info(JSON.stringify(e.error));
		        alert('Fallo el Login, por favor revise sus datos e intente de nuevo');
		    }
		});
	}
});

/*

$.btnTwitter.addEventListener('click', function(e){
	Ti.API.info("Login User btnTwitter");
	// If not authorized, get authorization from the user
	if(!Alloy.Globals.SocialT.isAuthorized()) {
    Alloy.Globals.SocialT.authorize(function(){		        
		   $.login.close();    	
    });
}
}
/*
Alloy.Globals.SocialT.share({
    message: "Salut, Monde!",
    success: function(e) {alert('Success!')},
    error: function(e) {alert('Error!')}
});
/
// Deauthorize the application
//Alloy.Globals.SocialT.deauthorize();

});

$.btnFacebook.addEventListener('click', function(e){
	Ti.API.info("Login User btnFacebook");
	var fb = Alloy.Globals.fbModule;
	fb.authorize();
});

*/

/*
 * crear un permiso publico para asignarselo a la version delos datos y asi todos los usuarios puedan
 * actualizar la version, tipicamente luego de agregar un comentario
 */
/*		     
    Alloy.Globals.Cloud.ACLs.create({
    name: 'publicObject',
    public_read: true,
    public_write: true
}, function (e) {
    if (e.success) {
        alert('Created!');
    } else {
        alert('Error:\n' +
            ((e.error && e.message) || JSON.stringify(e)));
    }
});
*/
