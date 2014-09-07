exports.definition = {
	config : {
		// table schema and adapter information
		"columns" : {
			"identificador" :"TEXT PRIMARY KEY",
			"nombre":"TEXT",
			"telefono":"TEXT",
			"direccion":"TEXT",
			"tiCloudID":"TEXT"
		},
		"defaults" : {
			"identificador" :"",
			"nombre":"",
			"telefono":"",
			"direccion":""
		},
		"adapter" : {
			"type" : "sql",
			"collection_name" : "teatros",
			"idAttribute": "identificador"
		}
	},

	extendModel : function(Model) {
		_.extend(Model.prototype, {
			// Extend, override or implement Backbone.Model
			validate : function(attrs) {
				for (var key in attrs) {
					var value = attrs[key];
					if (key === "nombre") {
						if (value.length <= 0) {
							return "Error: No hay nombre!";
						}
					}

				}
			},
			// Extend Backbone.Model ... here is on example of how to customs
			customProperty : 'teatro',
			customFunction : function() {
				Ti.API.info('Soy un modelo de teatro.');
			},
		});

		return Model;
	},

	extendCollection : function(Collection) {
		_.extend(Collection.prototype, {
			// Extend, override or implement Backbone.Collection
			// Implement the comparator method.
			comparator : function(teatro) {
				return teatro.get('nombre');
			}
		});

		return Collection;
	}
}
