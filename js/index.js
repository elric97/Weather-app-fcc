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
  $.ajax({
    url: api_cl,
    dataType: "jsonp",
    success: function(a){
      var temp=a.currently.temperature;
      $("#temp").html(temp);
      var tz=a.timezone;
      $("#loc").html("Your location is "+tz);
      var ftemp=temp;
      var ctemp=Math.floor((ftemp-32)*5/9);
      $("#temp2").html("Temperature in celsius is "+ctemp);
    }
  });
}