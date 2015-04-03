var app = app || {};

app.OutdoorView  = Backbone.View.extend({

  tagName: "div",
  className: "outdoorInfo",

  template: _.template( $("#outdoorDisplay").html() ),

  render: function() {
    var outdoorTemplate = this.template(this.model.toJSON());
    this.$el.html(outdoorTemplate);
    return this;
  }

});