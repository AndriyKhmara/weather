
$(document).ready(function () {

    var cities = [
        {
            'name'  : 'Rivne',
            'xCords': 50.630694,
            'yCords': 26.239034
        },
        {
            'name'  : 'Lviv ',
            'xCords': 49.839398,
            'yCords': 24.028062
        },
        {
            'name'  : 'Kiev',
            'xCords': 50.4308286,
            'yCords': 30.4966362
        }
    ];
    var templateList = [];

    var mapMarkerBuilder = function (city){
        $.ajax('/cityWeather', {
            method: 'POST',
            data: {
                cityName: city
            }
        }).done(function (data) {
            var newCityModel = new app.CityWeatherModel(data);
            var template = window.templates.render('model_template', {'model' : newCityModel.toJSON()});
            templateList.push({
                city : city,
                template : template
            });
            console.log('data from mongo***********************************************************************');
            console.log(data);

        });
    };

    var map = new L.Map('mapid');

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.emerald',
        accessToken: 'pk.eyJ1IjoiYW5keWtobWFyYSIsImEiOiJjaXVscXF5NTkwMDBiMm9waWlhamZldHB2In0.4ooYXIW33pagGNU4r9Hggw'
    }).addTo(map);


    var ukraine = new L.LatLng(48.8138644,28.1862516);
    map.setView(ukraine, 6);

    var markers = [];
    for (var i = 0; i < cities.length; i++) {
        console.log(cities[i]);
        mapMarkerBuilder(cities[i].name);
    }

    setTimeout(function () {
        for (var i = 0; i < cities.length; i++) {
            templateList.forEach(function (temp) {
                if (temp.city == cities[i].name) {
                    markers.push({
                        arr : [cities[i].yCords, cities[i].xCords, temp.template]
                    });

                }
            })
        }
        renderMarker();
    }, 500);


    var renderMarker = function () {
        for (var i = 0; i < markers.length; i++) {

            var lon = markers[i].arr[0];
            var lat = markers[i].arr[1];
            var popupText = markers[i].arr[2];

            var markerLocation = new L.LatLng(lat, lon);
            var marker = new L.Marker(markerLocation);
            map.addLayer(marker);

            marker.bindPopup(popupText);

        }
    };

});