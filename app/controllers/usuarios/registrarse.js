$.btnRegistrarse.addEventListener('click', function(e){
	if(validarForm()){ 
		$.btnRegistrarse.setVisible(false);
		Alloy.Globals.Cloud.Users.create({
		    email: $.txtEmail.value.trim(),
		    first_name: $.txtNombre.value.trim(),
		    last_name: $.txtApellido.value.trim(),
		    password: $.txtClave.value.trim(),
		    password_confirmation: $.txtRepetirClave.value.trim(),
		    username:$.txtUsuario.value.trim()		    
		}, function (e) {
		    if (e.success) {
		        var user = e.users[0];
		        Alloy.Globals.usuarioLogeado = {nombre:user.first_name,apellido:user.last_name,usuario:user.username,email:user.email,tiUsuer:true,idUsuario:user.id};
		        Ti.App.fireEvent('usuarioSeALogeado');
		      	$.login.close();
		    } else {
		    	$.btnRegistrarse.setVisible(true);
		        alert('Error:\n' +
		            ((e.error && e.message) || JSON.stringify(e)));
		    }
		});
	}
});

function validarForm(){
	var validateEmail = /([\w-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})/g;
	if($.txtUsuario.value.trim().length < 4 ){
		alert('El Usuario debe contener al menos un tamaño de 4');
		return false;
	}
	if( $.txtClave.value.trim().length < 6 ){
		alert('La Clave debe contener al menos un tamaño de 6');
		return false;
	}
	if( $.txtRepetirClave.value.trim() !=$.txtClave.value.trim()){
		alert('Repetir Clave debe ser igual a la Clave');
		return false;
	} 
	if( $.txtNombre.value.trim().length < 4){
		alert('El Nombre debe contener al menos un tamaño de 4');
		return false;
	}

	if( $.txtApellido.value.trim().length < 3){
		alert('El Apellido debe contener al menos un tamaño de 3');
		return false;
	} 
	
	if(!validateEmail.test($.txtEmail.value.trim())){
		alert('Favor completar un Email correcto');
		return false;
	}
	
	return true;
}
