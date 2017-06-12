$(document).ready(function(){
  getloc();
});
function getloc()
{
  if (navigator.geolocation)
    {
      navigator.geolocation.getCurrentPosition(position);
    }
}
function position(pos)
{
  var lat,lon;
  lat=pos.coords.latitude;
  lon=pos.coords.longitude;
  //$("#temp").html(lat);
  var api_cl="https://api.darksky.net/forecast/53d326bf95373e49670c4e1549698a22/"+lat+","+lon;
  var gapi="https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lon+"&key=AIzaSyAqvZ-EMF9r7D0V19MNlC8xPA52iMzZK2M"; //Google Map's API
	//Using dark sky api to get the forecast of your location  
	$.ajax({
   	url: api_cl,
    dataType: "jsonp",
    success: function(a){
      var temp=a.currently.temperature; // gets the current temperature 
      $("#temp").html(temp);
      var tz=a.timezone;
      var ftemp=temp;
      var ctemp=Math.floor((ftemp-32)*5/9); //converts the fahrenheit to celsius
      $(function() {
        $('#chck').change(function() {
          if ($(this).prop('checked')){
    				$('#temp').html(ftemp + "° "); //if the toggle is checked then it is fahrenheit 
    			} else {
    				$('#temp').html(ctemp + "° "); //if unchecked then Celsius 
    			}

        })
      })
    }
  });
	//This will give location from the latitude and longitude we got from the dark sky
  $.ajax({
    url: gapi,
    dataType: "json",
    success: function(g){
      var location=g.results[0].formatted_address;
      $("#loc").html("Your location is "+location);
    } 
  });
}