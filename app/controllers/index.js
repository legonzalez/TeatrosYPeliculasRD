$.mainTabGroup.addEventListener('open', function() {
	var activity = $.mainTabGroup.activity;
	if (Alloy.Globals.Android.Api >= 11) {
		activity.actionBar.title = "TeatrosYPeliculasRD";
		activity.actionBar.displayHomeAsUp = true;
	}

	activity.onCreateOptionsMenu = function(e) {
		var menuItem = e.menu.add({
			title : "Login",
			showAsAction : Ti.Android.SHOW_AS_ACTION_NEVER,
			icon : "add_icon.png"
		});
		menuItem.addEventListener("click", function(e) {
			Alloy.createController('usuarios/login').getView().open();
		});

		var menuItem2 = e.menu.add({
			title : "Registrarse",
			showAsAction : Ti.Android.SHOW_AS_ACTION_NEVER,
			icon : "add_icon.png"
		});
		menuItem2.addEventListener("click", function(e) {
			Alloy.createController('usuarios/registrarse').getView().open();
		});
		var menuItem3 = e.menu.add({
			title : "Logout",
			showAsAction : Ti.Android.SHOW_AS_ACTION_NEVER,
			icon : "add_icon.png"
		});
		menuItem3.addEventListener("click", function(e) {
			    if(Alloy.Globals.SocialT.isAuthorized()) {
    				Alloy.Globals.SocialT.deauthorize();
				}
			    if(Alloy.Globals.fbModule.getLoggedIn()) {
    				Alloy.Globals.fbModule.logout();
				}
			Alloy.Globals.Cloud.Users.logout(function (e) {
			    if (e.success) {
			    	Alloy.Globals.usuarioLogeado = {nombre:null,apellido:null,usuario:null,email:null,tiUsuer:false,idUsuario:null};
			        Ti.App.fireEvent('usuarioSeADeslogeado');
			    } else {
			        alert('Error:\n' +
			            ((e.error && e.message) || JSON.stringify(e)));
			    }
			    

			});
		});
		var menuItem5 = e.menu.add({
			title : "Twitter",
			showAsAction : Ti.Android.SHOW_AS_ACTION_NEVER,
			icon : "add_icon.png"
		});
		menuItem5.addEventListener("click", function(e) {
			if(!Alloy.Globals.SocialT.isAuthorized()) {
    			Alloy.Globals.SocialT.authorize();
    		}
		});
		var menuItem6 = e.menu.add({
			title : "Facebook",
			showAsAction : Ti.Android.SHOW_AS_ACTION_NEVER,
			icon : "add_icon.png"
		});
		menuItem6.addEventListener("click", function(e) {
			if(!Alloy.Globals.fbModule.getLoggedIn()) {
    			Alloy.Globals.fbModule.authorize();
    		}
		});
		/*var menuItem4 = e.menu.add({
			title : "Nosotros",
			showAsAction : Ti.Android.SHOW_AS_ACTION_NEVER,
			icon : "add_icon.png"
		});
		menuItem4.addEventListener("click", function(e) {
			Alloy.createController('admin/nosotros').getView().open();
		});*/
	}

	activity.invalidateOptionsMenu();
});
$.mainTabGroup.exitOnClose = true;
$.mainTabGroup.open(); 