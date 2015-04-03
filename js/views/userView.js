var app = app || {};

app.UserView = Backbone.View.extend({

  tagName: "article",
  className: "userInfo",

  template: _.template( $("#userDisplay").html() ),

  render: function() {
    var userTemplate = this.template(this.model.toJSON());
    this.$el.html(userTemplate);
    return this;
  }

});