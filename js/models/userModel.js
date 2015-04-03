var app = app || {};

app.User = Backbone.Model.extend({
	
	defaults: {
		username: null,
		fullName: null,
		password: null
	}
});