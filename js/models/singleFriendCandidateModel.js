var app = app || {};

app.SingleFriendCandidate= Backbone.Model.extend({
	
	defaults: {
		fullName: null,
		username: null,
		address: null,
	}
});