var app = app || {};

var weatherCollection = new app.WeatherCollection();

var mymap = L.map('mapid').setView([48.8138644, 28.1862516], 6);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.emerald',
    accessToken: 'pk.eyJ1IjoiYW5keWtobWFyYSIsImEiOiJjaXVscXF5NTkwMDBiMm9waWlhamZldHB2In0.4ooYXIW33pagGNU4r9Hggw'
}).addTo(mymap);

app.WeatherView = Backbone.View.extend({

    el: '#view_render_block',

    events: {
        'click #get-weather': '_getWeather'
    },    

    weatherCollection: weatherCollection,

    initialize: function () {
        this.listenTo(this.weatherCollection, 'update', this.render);
        this.weatherCollection.fetch();
    },

    render: function () {
        // this.weatherCollection.each(function (collection) {
        //     console.log(collection);
        // });
        var template = window.templates.render('main_template', {'collection' : this.weatherCollection.toJSON()});

        var marker = L.marker([50.630694, 26.239034]).addTo(mymap);
        marker.bindPopup(template).openPopup();
        this.$el.html(template);
    },

    _getWeather : function (){
        console.log('hi');
    }

});
new app.WeatherView();
$(document).ready(function () {
    setTimeout(function () {

    },500);

});


