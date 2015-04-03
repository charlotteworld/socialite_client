var app = app || {};

app.AllFriendCandidatesView = Backbone.View.extend({
	
	tagName: "ul",
	//className: "gallery ui-helper-reset ui-helper-clearfix",
	id: "friendCandidates",

	render: function() {
 	  this.collection.each(this.listFriendCandidate, this);
 		return this;
	},

	listFriendCandidate: function(friendCandidate) {
		//console.log("Now show a new singleFriendCandidateView");
		var friendCandidateView= new app.SingleFriendCandidateView ({ model: friendCandidate });
		this.$el.append(friendCandidateView.render().el);
	}
});