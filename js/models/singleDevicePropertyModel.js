var app = app || {};

app.singleDevicePropertyModel= Backbone.Model.extend({
	

	defaults: {
		deviceCapabilityId: null,
        deviceCapabilityType: null,
        deviceCapabilityName: null,
        deviceCapabilityValue: null,
        deviceCapabilityUnit: null,
        capabilityHistory: null
	}


});