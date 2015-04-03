var app = app || {};

app.SingleCatalogItemModel = Backbone.Model.extend({
	
	defaults: {
		deviceId: "default_id",
		deviceType: null,
		itemName: null,
		img: "images/placeholder.png"
	}

	
});