var app = app || {};

app.SingleFriendCandidateView = Backbone.View.extend({
	tagName: "li",
	//className: "ui-widget-content ui-corner-tr",

	template: _.template( $("#friendCandidateDisplay").html() ),

	render: function() {
    	var friendCandidateTemplate = this.template(this.model.toJSON());
    	this.$el.html(friendCandidateTemplate);
   		console.log("The first child of el is: " + this.$el.first().html());
    	console.log("This friendship model text is " + this.model.get('fullName'));
    	return this;
  	}

});