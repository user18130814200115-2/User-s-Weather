var jsondata, today, hour, day = 0,
    url = "https://wttr.in/?format=j1";

function LoadRemoteData() {
    fetch(url).then(function(e) {
        return e.json()
    }).then(function(e) {
        jsondata = e, printData()
    }).catch(function(e) {
        alert(e)
    })
}

function updateHours() {
    var e = jsondata.weather[day].hourly[hour].weatherDesc[0].value;
    document.getElementById("visual").innerHTML = "<img class='emoji' alt='" + e + "' src=assets/emoji/" + emoji[e] + ">", document.getElementById("hourly").innerHTML = "<b>Hourly:</b><br>" + jsondata.weather[day].hourly[hour].weatherDesc[0].value + "<br>" + jsondata.weather[day].hourly[hour].chanceofrain + "% chance of rain<br>" + jsondata.weather[day].hourly[hour].chanceofovercast + "% chance of overcast", document.getElementById("time").innerHTML = 3 * (hour + 0) + ":00 - " + 3 * (hour + 1) + ":00"
}

function printData() {
    document.getElementById("daily").innerHTML = "<b>Weather in<input id='placeinput' type='text' placeholder='" + jsondata.nearest_area[0].areaName[0].value.replace(/[^\w\s]/gi, "") + " " + jsondata.nearest_area[0].region[0].value + "'></b>" + jsondata.weather[day].date + ":<br>" + jsondata.weather[day].mintempC + "-" + jsondata.weather[day].maxtempC + " C", updateHours();
    var e = document.getElementById("placeinput");
    e.focus(), e.select()
}

function reload() {
    0 == navigator.onLine && alert("Device is not connected to the internet"), today = new Date, hour = Math.floor(today.getHours() / 3), LoadRemoteData()
}
load(), document.onkeypress = function(e) {
    37 == (e = e || window.event).keyCode ? ((hour += -1) < 0 && (0 < day ? (hour = 7, --day, printData()) : hour = 0), updateHours()) : 39 == e.keyCode ? (7 < (hour += 1) && (day < 3 ? (hour = 0, day += 1, printData()) : hour = 7), updateHours()) : 38 == e.keyCode ? reload() : 13 == e.keyCode && (url = "https://wttr.in/" + document.getElementById("placeinput").value + "?format=j1", document.getElementById("placeinput").value = "", LoadRemoteData())
};
