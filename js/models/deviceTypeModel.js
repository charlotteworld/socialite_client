var app = app || {};

app.DeviceTypeModel = Backbone.Model.extend({
	
	defaults: {
		deviceType: null,
		catalogItems: new app.CatalogItemCollection(),
		catalogItemsView: null
	},

	initCatalogItemsView: function(catalogCollection) {
		this.catalogItemsView = new app.CatalogListItemsView({collection: catalogCollection});
	}

});