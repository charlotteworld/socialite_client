var app = app || {};

app.SingleFriendshipView = Backbone.View.extend({
	tagName: "li",
	//className: "ui-widget-content ui-corner-tr",

	template: _.template( $("#friendshipDisplay").html() ),

	render: function() {
    	var friendshipTemplate = this.template(this.model.toJSON());
    	this.$el.html(friendshipTemplate);
   		console.log("The first child of el is: " + this.$el.first().html());
    	console.log("This friendship model text is " + this.model.get('relationshipId'));
    	return this;
  	}

});