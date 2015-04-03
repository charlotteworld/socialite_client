var app = app || {};

app.IndoorCollectionView = Backbone.View.extend({
  //tagName: 'li',

   render: function(){
       this.collection.each(function(indoorLocation){
           var indoorView = new app.IndoorView({ model: indoorLocation });
           this.$el.append(indoorView.el);
           alert(indoorView.el);
       }, this);
   }
});
