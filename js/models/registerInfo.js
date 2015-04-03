var app = app || {};

app.RegisterInfo = Backbone.Model.extend({
	
	defaults: {
		username: null,
		password: null,
		fullName: null
	}
});