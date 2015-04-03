var app = app || {};

app.DeviceModel = Backbone.Model.extend({
	
	defaults: {
	deviceManufacturerId: null,
	deviceName: null,
	deviceManufacturer : null,
	deviceType : null,
	deviceRoom: null,
	client_id: null,
	client_secret: null,
	code:null 
	}
});