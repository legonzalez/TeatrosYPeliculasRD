exports.definition = {
	config : {
		// table schema and adapter information
		"columns" : {
			"idPelicula":"TEXT",
			"idCine":"TEXT",
			"lunes":"TEXT",
			"martes":"TEXT",
			"miercoles":"TEXT",
			"jueves":"TEXT",
			"viernes":"TEXT",
			"sabado":"TEXT",
			"domingo":"TEXT",
			"tiCloudID":"TEXT"
		},
		"defaults" : {
			"idPelicula":"",
			"idCine":"",
			"lunes":"",
			"martes":"",
			"miercoles":"",
			"jueves":"",
			"viernes":"",
			"sabado":"",
			"domingo":""
		},
		"adapter" : {
			"type" : "sql",
			"collection_name" : "cinesPeliculas"
		}
	},

	extendModel : function(Model) {
		_.extend(Model.prototype, {
			// Extend, override or implement Backbone.Model
			validate : function(attrs) {
				for (var key in attrs) {
					var value = attrs[key];
					if (key === "idPelicula") {
						if (value.length <= 0) {
							return "Error: No hay idPelicula!";
						}
					}

				}
			},
			// Extend Backbone.Model ... here is on example of how to customs
			customProperty : 'cinesPeliculas',
			customFunction : function() {
				Ti.API.info('Soy un modelo de cinesPeliculas.');
			},
		});

		return Model;
	},

	extendCollection : function(Collection) {
		_.extend(Collection.prototype, {
			// Extend, override or implement Backbone.Collection
			// Implement the comparator method.
			comparator : function(cine) {
				return cine.get('idPelicula');
			}
		});

		return Collection;
	}
}
