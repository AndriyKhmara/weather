var request = require('request');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/weather');

var Schema = mongoose.Schema;

var WeatherData = new Schema({ 
	city: String,   
	temperature: Number,
	date: { type: Date, default: Date.now }
});

var weather = mongoose.model('weather', WeatherData);

setInterval(function(){
 
  request('http://api.openweathermap.org/data/2.5/weather?q=Rivne,ua&appid=61fcce5990843ee68faf88af27178d3a', function (error, response, body) {
	if (!error && response.statusCode == 200) {
		var parseBody = JSON.parse(body);
		  
		var data = {
			city: parseBody.name,   
			temperature: (parseBody.main.temp-273).toFixed(2),
		}
		console.log(data);
		weather.create(data, function (err) {
			//console.log(err);
		});	
  }});
  

},6000);

weather.find({}, function(err, items) {
    var userMap = {};

    items.forEach(function(item) {
      userMap[item._id] = item;
    });

    console.log(userMap);  
});



	