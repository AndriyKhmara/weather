$(document).ready(function () {

    var initialize = function () {
        getDataForChart('Rivne');
    };

    window.weather = (function () {
        var changeTypeOfChart = function () {
            var type = $('#typeOfChart').val();
            renderChart(dataForChart, type);
        };

        var updateWeather = function () {
            $.ajax('/updateWeather', {
                method: 'POST',
                data: {
                    
                }
            }).done(function (data) {
                //TODO: make some message for successfully update weather data
            });
        };

        return {
            changeTypeOfChart:changeTypeOfChart,
            updateWeather:updateWeather
        }
    })();

    var dataForChart = [], cities = [
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

    $('#typeOfChart').on('change', function () {
        var type = $('#typeOfChart').val();        
    });

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

    var getDataForChart = function (city) {
        $.ajax('/getDataForChart', {
            method: 'POST',
            data: {
                cityName: city
            }
        }).done(function (data) {
            dataForChart = data;
            renderChart(data, 'temp');
        });
    };



    var preDataChart = function (data, type) {        
        var date = [];
        var result = [];
        for (var i = 0; i < data.length; i++) {
            var t = new Date(data[i].time);
            date.push(t.getFullYear() + '-' + t.getMonth() + '-' + t.getDate() + ' ' + t.getHours() + ':' + t.getMinutes());
            switch (type) {
                case 'temp':
                    result.push(data[i].main.temp - 273.15);
                    break;
                case 'pressure':
                    result.push(data[i].main.pressure);
                    break;
                case 'humidity':
                    result.push(data[i].main.humidity);
                    break;
            }
        }
        return {
            date : date,
            data : result
        }
    };

    var renderChart = function (data, type) {

        var result = preDataChart(data, type);

        var ctx = document.getElementById("myChart");
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: result.date,
                datasets: [{
                    label: '# of Votes',
                    data: result.data

                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });
    };
    /**********Materialize scripts*******/
    $(document).ready(function() {
        $('select').material_select();
    });


    initialize();
});

