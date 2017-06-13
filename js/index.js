$(document).ready(function(){
  getloc();
});
function getloc()
{
	//get location from geolocation api
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
  	var gapi="https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lon+"&key=AIzaSyAqvZ-EMF9r7D0V19MNlC8xPA52iMzZK2M";
	//get the weather forecast from dark sky api
  	$.ajax(
	{
    	url: api_cl,
    	dataType: "jsonp",
    	success: function(a)
		{
      		var temp=a.currently.temperature;
      		$("#temp").html(temp+"° ");
      		var tz=a.timezone;
      		var ftemp=temp;
      		var ctemp=Math.floor((ftemp-32)*5/9);
      		var icons=a.currently.icon;
      		var skycons = new Skycons(
			{
				"monochrome": false,  //for getting weather icons from dark sky's skycon
            	"colors": 
				{
					"main": "#333333",
               		"moon": "#78586F",
                	"fog": "#78586F",
                	"fogbank": "#B4ADA3",
                	"cloud": "#B4ADA3",
                	"snow": "#7B9EA8",
                	"leaf":"#7B9EA8",
                	"rain": "#7B9EA8",
      	        	"sun": "#FF8C42"
     	    	} 
			});
      		skycons.add('icon',icons);
      		skycons.play(); //to animate the icons 
      		$(function() 
			{
        		$('#chck').change(function() 
				{
          			if ($(this).prop('checked'))
					{
    						$('#temp').html(ftemp + "° "); //if the toggle is checked then it is fahrenheit 
    				} 
					else 
					{
						$('#temp').html(ctemp + "° "); //if unchecked then Celsius 
    				}
        		});
      		});
    	}
  	});
	//function whic gets location from google map api
  	$.ajax(
	{
    	url: gapi,
    	dataType: "json",
    	success: function(g)
		{
      		var location=g.results[0].formatted_address;
      		$("#loc").html("Your location is "+location);
    	}
  	});
}