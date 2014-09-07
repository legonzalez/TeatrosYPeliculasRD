exports.definition = {
	config : {
		// table schema and adapter information
		"columns" : {
			"idObra":"TEXT",
			"idTeatro":"TEXT",
			"horarios":"TEXT",
			"tiCloudID":"TEXT"
		},
		"defaults" : {
			"idObra":"",
			"idTeatro":"",
			"horarios":""
		},
		"adapter" : {
			"type" : "sql",
			"collection_name" : "teatrosObras"
		}
	},

	extendModel : function(Model) {
		_.extend(Model.prototype, {
			// Extend, override or implement Backbone.Model
			validate : function(attrs) {
				for (var key in attrs) {
					var value = attrs[key];
					if (key === "idObra") {
						if (value.length <= 0) {
							return "Error: No hay idObra!";
						}
					}

				}
			},
			// Extend Backbone.Model ... here is on example of how to customs
			customProperty : 'teatrosObras',
			customFunction : function() {
				Ti.API.info('Soy un modelo de teatrosObras.');
			},
		});

		return Model;
	},

	extendCollection : function(Collection) {
		_.extend(Collection.prototype, {
			// Extend, override or implement Backbone.Collection
			// Implement the comparator method.
			comparator : function(teatro) {
				return teatro.get('idObra');
			}
		});

		return Collection;
	}
}
