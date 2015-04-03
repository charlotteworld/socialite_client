var app = app || {};

app.CatalogItemCollection= Backbone.Collection.extend({
	model: app.SingleCatalogItemModel
})

