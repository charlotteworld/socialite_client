var app = app || {};

app.AllDeviceTypesView = Backbone.View.extend({
	
	tagName: "ul",
	className: "gallery ui-helper-reset ui-helper-clearfix",
	id: "gallery",

	render: function() {
 	  this.collection.each(this.addDeviceType, this);
 		return this;
	},

	addDeviceType: function(deviceType) {
		console.log("Now adding new singleDeviceTypeView");
		var deviceTypeView = new app.SingleDeviceTypeView ({ model: deviceType });
		this.$el.append(deviceTypeView.render().el);
	}
});