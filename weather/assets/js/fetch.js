var jsondata;
var today;
var hour;

var day = 0;

load();

function LoadRemoteData() {
    fetch("https://wttr.in/?format=j1")
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
	document.getElementById("hourly").innerHTML = "<br><b>Hourly:</b><br>" + jsondata.weather[day].hourly[hour].weatherDesc[0].value + "<br>" + jsondata.weather[day].hourly[hour].chanceofrain + "% chance of rain<br>" + jsondata.weather[day].hourly[hour].chanceofovercast + "% chance of overcast";
	document.getElementById("software-keys-center").innerHTML = (hour+0)*3 + ":00 - " + (hour+1)*3 + ":00";
}

function printData() {
	document.getElementById("daily").innerHTML = "<b>Weather in " + jsondata.nearest_area[0].areaName[0].value + " " + jsondata.nearest_area[0].region[0].value + "</b><br>" + jsondata.weather[day].date + ":<br>" + jsondata.weather[day].mintempC + "-" + jsondata.weather[day].maxtempC + " C";
	updateHours();
}

function reload() {
	
	if (navigator.onLine == false) {
		document.getElementById("error").innerHTML = "Device is not connected to the internet";
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
};
