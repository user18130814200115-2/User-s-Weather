var jsondata;
var today;
var hour;

var day = 0;
var url = "https://wttr.in/?format=j1"

load();



function LoadRemoteData() {
    fetch(url)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        jsondata = data;
        printData();
    })
    .catch(function (err) {
        document.getElementById("daily").innerHTML = "<br>" + err;
    });
}

function updateHours() {
    var desc = jsondata.weather[day].hourly[hour].weatherDesc[0].value;
    //document.getElementById("visual").innerHTML = twemoji.parse(emoji[desc]);
    document.getElementById("visual").innerHTML = "<img class='emoji' alt=\'" + desc + "\' src=assets/emoji/" + emoji[desc] + ">";
	document.getElementById("hourly").innerHTML = "<b>Hourly:</b><br>" + jsondata.weather[day].hourly[hour].weatherDesc[0].value + "<br>" + jsondata.weather[day].hourly[hour].chanceofrain + "% chance of rain<br>" + jsondata.weather[day].hourly[hour].chanceofovercast + "% chance of overcast";
	document.getElementById("software-keys-center").innerHTML = (hour+0)*3 + ":00 - " + (hour+1)*3 + ":00";
}

function printData() {
	document.getElementById("daily").innerHTML = "<b>Weather in<input id='placeinput' type='text' placeholder='" + jsondata.nearest_area[0].areaName[0].value.replace(/[^\w\s]/gi, '') + " " + jsondata.nearest_area[0].region[0].value + "'></b>" + jsondata.weather[day].date + ":<br>" + jsondata.weather[day].mintempC + "-" + jsondata.weather[day].maxtempC + " C";
	updateHours();
	var input = document.getElementById('placeinput');
		input.focus();
		input.select();
}

function reload() {
	
	if (navigator.onLine == false) {
		alert("Device is not connected to the internet");
	}
		
	today = new Date();
  	hour = Math.floor(today.getHours()/3);

   	LoadRemoteData();
}
window.onload = function() {
  reload();
};

document.onkeypress = function (e) {
    e = e || window.event;
    // use e.keyCode
    if (e.keyCode == 37) {
    	hour += -1;
    	if (hour < 0) {
            if (day > 0) {
                hour=7; 
                day -=1; 
                printData();
            }
            else {
                hour = 0;
            }
        }
        updateHours();
    }
    else if (e.keyCode == 39) {
    	hour += 1;
    	if (hour > 7) {
            if (day < 3) {
                hour = 0; 
                day += 1; 
                printData();
            }
            else {
                hour = 7;
            }
        }
        updateHours();
    }
    else if (e.keyCode == 38) {
    	reload();
    }
    else if (e.keyCode == 13) {
    	url = "https://wttr.in/" + document.getElementById('placeinput').value + "?format=j1";
    	document.getElementById('placeinput').value = "",
    	LoadRemoteData();
    }
};
