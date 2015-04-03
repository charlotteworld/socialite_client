var app = app || {};

app.IndoorView = Backbone.View.extend({

  tagName: "div",
  className: "indoorInfo",

  template: _.template( $("#indoorDisplay").html() ),

  render: function() {
    var indoorTemplate = this.template(this.model.toJSON());
   
    this.$el.html(indoorTemplate);
    return this;
  }

});