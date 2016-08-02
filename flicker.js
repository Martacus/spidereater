var long;
var lat;
var name;

var geo = false;

function calcSpider(){
  if(geo === false){
    if($("#cityLabel").val() === ""){
      alert("Please fill in city");
      return;
    }
    else{
      name = $("#cityLabel").val();
    }
  }
  noise.seed(1337);

  if($("#ageLabel").val() === ""){
    alert("No age filled in");
    return;
  }
  var age = $("#ageLabel").val();
  var perlin = noise.perlin2(long, lat);
  var spiders = age*( 7 + perlin * 5 + prng(stringToSeed(name))*1); spiders = Math.round(spiders);

  $("#SP").html('You have eaten ' + spiders + ' spiders in your sleep.');
}

function success(pos) {
  var crd = pos.coords;
  long = crd.longitude;
  lat = crd.latitude;
  geo = true;

  $.getJSON('https://maps.googleapis.com/maps/api/geocode/json?latlng='+  lat + ',' + long + '&sensor=true', function(data){
    name = data.results[1].address_components[1].short_name;
    $("#cityLabel").val(name);
  })
};

function error(err) {
  if (err.code == err.PERMISSION_DENIED) {
    long = 1;
    lat = 1;
  }else{
      console.warn('ERROR(' + err.code + '): ' + err.message);
  }
};


$( document ).ready(function() {
  alert("Please enable the acces to your location, if you dont you will need to fill in your city!");
var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};
navigator.geolocation.getCurrentPosition(success, error, options);
});

////////////////////////////////////////////

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
