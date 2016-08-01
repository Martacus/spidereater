var long;
var lat;
var name;



function calcSpider(){
  var age = $("#textField").val();
  noise.seed(1337);
  var perlin = noise.perlin2(long, lat);
  var spiders = age*( 7 + perlin * 5 + prng(stringToSeed(name))*1);
  spiders = Math.round(spiders);
  $("#SP").html('You have eaten ' + spiders + ' spiders in your sleep.');
}

function stringToSeed(i) {
    var result = 0;
    for(var n = 0; n<i.length; n++) {
        result += i.charCodeAt(n)*(n+1);
    }
    return result;
}

function prng(seed) {
    seed = (seed*930001+11503)%(233280);
    return (0+((1-0)*seed/(233280)));
}

function success(pos) {
  var crd = pos.coords;
  long = crd.longitude;
  lat = crd.latitude;
  console.log(long);
  console.log(lat);
};

function error(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);
};


$( document ).ready(function() {
var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};
navigator.geolocation.getCurrentPosition(success, error, options);
$.getJSON('https://maps.googleapis.com/maps/api/geocode/json?latlng='+  lat + ',' + long + '&sensor=true', function(data){
  name = data.results[1].address_components[1].short_name;
  console.log(JSON.stringify(data));
  console.log(name);
})
});
