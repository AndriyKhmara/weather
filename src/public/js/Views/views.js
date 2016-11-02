var app = app || {};

// var weatherCollection = new app.WeatherCollection();


// app.WeatherView = Backbone.View.extend({
//
//     el: '#view_render_block',
//
//     events: {
//         'click #get-weather': '_getWeather'
//     },
//
//     weatherCollection: weatherCollection,
//
//     initialize: function () {
//         this.listenTo(this.weatherCollection, 'update', this.render);
//         this.weatherCollection.fetch();
//     },
//
//     render: function () {
//         // this.weatherCollection.each(function (collection) {
//         //     console.log(collection);
//         // });
//         var template = window.templates.render('main_template', {'collection' : this.weatherCollection.toJSON()});
//
//         
//         this.$el.html(template);
//     },
//
//     _getWeather : function () {
//         console.log('hi');
//     }
//
// });
// new app.WeatherView();


