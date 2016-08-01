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

function prng(seed, bottom = 0, top = 1) {
    seed = (seed*930001+11503)%(233280);
    return (bottom+((top-bottom)*seed/(233280)));
}

function success(pos) {
  var crd = pos.coords;

  console.log('Your current position is:');
  console.log('Latitude : ' + crd.latitude);
  console.log('Longitude: ' + crd.longitude);
  console.log('More or less ' + crd.accuracy + ' meters.');
};

function error(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);
};


$( document ).ready(function() {
  if ("geolocation" in navigator) {
    console.log("A");
    navigator.geolocation.getCurrentPosition(function(position) {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      console.log(long);
      console.log(lat);
    });
  } else {
    console.log("v");/* geolocation IS NOT available */
}

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};



navigator.geolocation.getCurrentPosition(success, error, options);

});
