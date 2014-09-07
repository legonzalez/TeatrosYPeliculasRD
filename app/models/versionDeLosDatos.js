exports.definition = {
	config : {
		// table schema and adapter information
		"columns" : {
			"peliculas":"INTEGER",
			"cines":"INTEGER",
			"cinesPeliculas":"INTEGER",
			"obras":"INTEGER",
			"teatros":"INTEGER",
			"teatrosObras":"INTEGER",
			"tiCloudID":"TEXT"
		},
		"defaults" : {
			"peliculas":0,
			"cines":0,
			"cinesPeliculas":0,
			"obras":0,
			"teatros":0,
			"teatrosObras":0
		},
		"adapter" : {
			"type" : "sql",
			"collection_name" : "versionDeLosDatos"
		}
	},

	extendModel : function(Model) {
		_.extend(Model.prototype, {
			// Extend, override or implement Backbone.Model
			validate : function(attrs) {
				for (var key in attrs) {
					var value = attrs[key];
					if (key === "peliculas") {
						if (value.length <= 0) {
							return "Error: No hay peliculas!";
						}
					}

				}
			},
			// Extend Backbone.Model ... here is on example of how to customs
			customProperty : 'versionDeLosDatos',
			customFunction : function() {
				Ti.API.info('Soy un modelo de versionDeLosDatos.');
			},
		});

		return Model;
	},

	extendCollection : function(Collection) {
		_.extend(Collection.prototype, {
			// Extend, override or implement Backbone.Collection
			// Implement the comparator method.
			comparator : function(versionDeLosDatos) {
				return versionDeLosDatos.get('peliculas');
			}
		});

		return Collection;
	}
}
