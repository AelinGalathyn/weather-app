$('form').submit(function (e) {
    e.preventDefault();
    loadWeather();
});

function loadWeather() {
    var $cityR = $('#cityR');
    var $weatherR = $('#weatherR');

    var $iconR = $('#icon');
    var $tempR = $('#tempR');
    var $tempScale = $('#tempScale');

    var $humidity = $('#humidity');
    var $pressure = $('#pressure');
    var $windSpeed = $('#windSpeed');

    var inputCity = $('#inputCity').val();

    var apiKey = "hh43IaB0mUPZs3TFOL9XRtLDi3HGGBTG";

    var locationResourceURL = 'https://dataservice.accuweather.com/locations/v1/cities/search?apikey=' + apiKey + '&q=' + inputCity;


    $.ajax({
        url: locationResourceURL,
        method: 'GET'
    }).done(function (result) {

        var locationKey = result[0].Key;
        var location = result[0].EnglishName;

        var conditionsResURL = 'https://dataservice.accuweather.com/currentconditions/v1/' + locationKey + '?apikey=' + apiKey + '&details=true';

        $.ajax({
            url: conditionsResURL,
            method: 'GET'
        }).done(function (result) {
            var weatherR = result[0].WeatherText;
            var tempR;
            var tempScale;
            var iconR = 'icons/conditions/' + result[0].WeatherIcon + '.svg';
            console.log(iconR);
            var humidity = result[0].RelativeHumidity + '%';
            var pressure;
            var windSpeed;

            tempR = Math.round(result[0].Temperature.Metric.Value).toString();
            tempScale = '℃';
            pressure = Math.round(result[0].Pressure.Metric.Value).toString() + ' mb';
            windSpeed = Math.round(result[0].Wind.Speed.Metric.Value).toString() + ' km/h';


            $cityR.text(location);
            $weatherR.text(weatherR);
            $tempR.text(tempR);
            $tempScale.text(tempScale);
            $iconR.attr("src", iconR);

            $humidity.text(humidity);
            $pressure.text(pressure);
            $windSpeed.text(windSpeed);
        });
    });
    return false;
}
