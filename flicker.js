var long;
var lat;
var name;

geolocator.config({
    language: "en",
    google: {
        version: "3",
        key: "AIzaSyBWvBXCZcG4pw_sX3tlGQVXQwXO9i0eFgM"
    }
});

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




$( document ).ready(function() {
  var options = {
            enableHighAccuracy: true,
            timeout: 6000,
            maximumAge: 0,
            desiredAccuracy: 30,
            fallbackToIP: true, // fallback to IP if Geolocation fails or rejected
            addressLookup: true,
            timezone: true,
            map: "map-canvas"
        };
        geolocator.locate(options, function (err, location) {
            if (err) return console.log(err);
            console.log(location);
        });
});
