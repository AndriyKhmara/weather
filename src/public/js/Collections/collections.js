var app = app || {};

app.WeatherCollection = Backbone.Collection.extend({

    model: app.WeatherModel,

    url: function () {
        // return '/citiesWeather/' + (this.id ? this.id : 0);
        return '/citiesWeather';
    }
});