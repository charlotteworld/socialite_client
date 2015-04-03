var app = app || {};

app.CatalogListItemsView = Backbone.View.extend({
	
	tagName: "ul",
	className: "catalogInfo",

	render: function() {
 	  this.collection.each(this.addCatalogItem, this);
 		return this;
	},

	addCatalogItem: function(catalogItem) {
		console.log("Now adding a singleCatalogItemView");
		console.log("itemName of this model is " + catalogItem.itemName);
		var catalogItemView = new app.SingleCatalogItemView ({ model: catalogItem });
		this.$el.append(catalogItemView.render().el);
	}
});