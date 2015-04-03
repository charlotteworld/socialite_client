var app = app || {};

app.SingleDeviceTypeView = Backbone.View.extend({
	tagName: "li",
	className: "deviceTypeInfo",
	catalogCollection: new app.CatalogItemCollection(),

	template: _.template( $("#deviceTypeDisplay").html() ),

	render: function() {
    var deviceTypeTemplate = this.template(this.model.toJSON());
    this.$el.html(deviceTypeTemplate);
    console.log("This deviceTypeTemplate model text is " + this.model.deviceType);
    
    console.log("Now creating catalogCollectionView");
    this.$el.append(this.model.catalogItemsView.render().el);
    
    return this;
  	}
});