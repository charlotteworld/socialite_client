var app = app || {};

app.SingleCatalogItemView = Backbone.View.extend({
	tagName: "li",
	className: "ui-widget-content ui-corner-tr",
	events: {
    	"click span.glyphicon.glyphicon-trash": "removeItem"
    },

	template: _.template( $("#catalogItemDisplay").html() ),

	initialize: function(){
        $( this.el ).draggable({
	    cancel: "a.ui-icon", // clicking an icon won't initiate dragging
	    revert: "invalid", // when not dropped, the item will revert back to its initial position
	    containment: "document",
	    helper: "clone",
	    cursor: "move"
	}).data("info", {"model": this.model.get('deviceType'), "name": this.model.get('itemName'), "id": this.model.get('deviceId')});
        $(this.el).data("backbone-view", this);
    },

	render: function() {
    var catalogItemTemplate = this.template(this.model.toJSON());
    this.$el.html(catalogItemTemplate);
    console.log("The first child of el is: " + this.$el.first().html());
    console.log("This catalogItemTemplate model text is " + this.model.get('itemName'));
	console.log("Device ID is " + this.model.get('deviceId'))
    return this;
  	},

  	removeItem: function() {
  		$(this.el).fadeOut();
  	}
});