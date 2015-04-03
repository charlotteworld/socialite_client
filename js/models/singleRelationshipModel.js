var app = app || {};

app.SingleRelationshipModel = Backbone.Model.extend({
	
	defaults: {
		relationshipId: null,
		subjectTye: null,
		subjectId: null,
		relationshipType: null, 
		objectType: null, 
		objectId: null
	}
});