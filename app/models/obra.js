exports.definition = {
	config : {
		// table schema and adapter information
		"columns" : {
			"identificador" :"TEXT PRIMARY KEY",
			"generos":"TEXT",
			"trailer":"TEXT",
			"sinopsis":"TEXT",
			"titulo" : "TEXT",
			"stars" : "INTEGER",
			"votos" : "INTEGER",
			"portada" : "TEXT",
			"tiCloudID":"TEXT"
		},
		"defaults" : {
			"identificador" :"",
			"generos":"",
			"trailer":"",
			"sinopsis":"sinopsis para esta obra",
			"titulo" : "Movie",
			"stars" : 0,
			"votos" : 0,
			"portada" : "default.jpg",
		},
		"adapter" : {
			"type" : "sql",
			"collection_name" : "obras",
			"idAttribute": "identificador"
		}
	},

	extendModel : function(Model) {
		_.extend(Model.prototype, {
			// Extend, override or implement Backbone.Model
			validate : function(attrs) {
				for (var key in attrs) {
					var value = attrs[key];
					if (key === "titulo") {
						if (value.length <= 0) {
							return "Error: No hay Titulo!";
						}
					}

				}
			},
			// Extend Backbone.Model ... here is on example of how to customs
			customProperty : 'obra',
			customFunction : function() {
				Ti.API.info('Soy un modelo de obra.');
			},
		});

		return Model;
	},

	extendCollection : function(Collection) {
		_.extend(Collection.prototype, {
			// Extend, override or implement Backbone.Collection
			// Implement the comparator method.
			comparator : function(obra) {
				return obra.get('titulo');
			}
		});

		return Collection;
	}
}
