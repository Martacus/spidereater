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

$( document ).ready(function() {
  $.getJSON('http://ip-api.com/json', function(data){
    name = data.city;
    long = data.lon;
    lat = data.lat;
  })
});
