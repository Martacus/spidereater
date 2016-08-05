var long = 0;
var lat = 0;
var name;
var yearly;
var spiders;

var geo = false;

function calcSpider(){
	var cityAddition = 0;
  if(geo === false){
    long = lat = 0;
    if($("#textLabel").val() == ""){
      alert("Please fill in city");
      return;
    } else {
      name = $("#textLabel").val().toLowerCase();
	  cityAddition = prng(stringToSeed(name)-.5)*2*3;
    }
  }
  noise.seed(1337);

  var age = $("#ageLabel").val();
  if(isNaN(age) || age <= 0 || age >= 200){
    alert("Please enter a number for your age");
    return;
  }
  
  var perlin = noise.perlin2(long/100, lat/100);
  yearly = (7 + perlin*3 + cityAddition);
  spiders = Math.round(age*yearly);
  type($("#SP"), 'Based on your age and location, SpiderCalculator comes to the conclusion:', 0);

  setTimeout(displaySpoder, 3000)
  //$("#SP").html('Did you know you eat around 7 spiders a year while you sleep? With my awesome calculations ive come to a conclusion. <br>You have eaten ' + spiders + ' spiders in your sleep.');
}

function displaySpoder(){
  type($("#SP2"), '\nOn average, you eat over ' + Math.floor(yearly*10)/10 + ' spider' + (yearly!=1?"s":"") + ' every year! You have eaten ' + spiders + ' spider' + (spiders>1?"s":"") + ' in your sleep.', 0);
  
  var tweetText = 'I\'ve eaten '+ spiders + ' spider' + (spiders>1?"s":"") + ' in my sleep! How many have you eaten? #SpiderCalculator\n';
  $('.twitter-share-button').attr('data-text', tweetText);

  $('#spiderDiv iframe').remove();
  // Generate new markup
  var tweetBtn = $('<a></a>')
      .addClass('twitter-share-button')
      .attr('href', 'http://twitter.com/share')
      .attr('data-url', 'https://martacus.github.io/spidereater')
      .attr('data-hashtags', 'spidercalc')
      .attr('data-related', 'BMartacus, Zanzlanz')
      .attr('data-show-count', 'true')
      .attr('data-text', tweetText);
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
    return (seed/233280);
}

function type($el, text, position) {

	if (text.length >= position) {
			$el.text(text.substring(0, position));
			setTimeout(function() { type($el, text, position + 1); }, 10)
	}
}
