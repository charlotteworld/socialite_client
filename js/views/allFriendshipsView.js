var app = app || {};

app.AllFriendshipsView = Backbone.View.extend({
	
	tagName: "ul",
	className: "gallery ui-helper-reset ui-helper-clearfix",
	id: "friendships",

	render: function() {
 	  this.collection.each(this.listFriendship, this);
 		return this;
	},

	listFriendship: function(friendship) {
		//console.log("Now show a new singleFriendshipView");
		//change charlotte
		var friendshipView = new app.SingleFriendshipView ({ model: friendship });
		this.$el.append(friendshipView.render().el);
	}
});