var long;
var lat;
var name;
var spiders;

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
  spiders = age*( 7 + perlin * 5 + prng(stringToSeed(name))*1); spiders = Math.round(spiders);
  type($("#SP"), 'Did you know you eat around 7 spiders a year while you sleep? With my awesome calculations ive come to a conclusion. ', 0);

  setTimeout(displaySpoder, 3000)
  //$("#SP").html('Did you know you eat around 7 spiders a year while you sleep? With my awesome calculations ive come to a conclusion. <br>You have eaten ' + spiders + ' spiders in your sleep.');
}

function displaySpoder(){
  type($("#SP2"), '\n You have eaten ' + spiders + ' spiders in your sleep.', 0);
  $('.twitter-share-button').attr('data-text', 'I\'ve eaten '+ spiders + ' spiders in my sleep! How many have you eaten?');

  $('#spiderDiv iframe').remove();
  // Generate new markup
  var tweetBtn = $('<a></a>')
      .addClass('twitter-share-button')
      .attr('href', 'http://twitter.com/share')
      .attr('data-url', 'https://martacus.github.io/spidereater')
      .attr('data-hashtags', 'spidercalc')
      .attr('data-related', 'Zanzlanz , BMartacus')
      .attr('data-show-count', 'true')
      .attr('data-text', 'I\'ve eaten '+ spiders + ' spiders in my sleep! How many have you eaten?');
  $('#spiderDiv').append(tweetBtn);
  twttr.widgets.load();

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
  $("#ageLabel").numeric();
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

function type($el, text, position) {

	if (text.length >= position) {
			$el.text(text.substring(0, position));
			setTimeout(function() { type($el, text, position + 1); }, 10)
	}
}
