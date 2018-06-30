$(document).ready(function() {
    setTimeout(function() {
        $("#btn").show();
        $("#setBtn").show();        
        $("#returnRandom").show();
        $("#showAll").show();
        $("#clear").show();
    }, 3000);
    document.getElementById("btn").onclick = search;
    document.getElementById("setBtn").onclick = setValues;
    document.getElementById("returnRandom").onclick = returnRandom;    
    document.getElementById("showAll").onclick = showAll;
    document.getElementById("clear").onclick = clearAll;
});

var service;
var map;
var list = [];
var coords = [];
var uniqueList = [];
var keyword;

function initialise() {
    map = new google.maps.Map(document.getElementById('map'));
}

function setValues() {
    console.log('getting coords');
    var zipField = document.getElementById('zipField').value;
    keyword = $("#selector").val();
    getLatLngByZipcode(zipField.toString());
}

function search() {
    map.setCenter({
        lat: 33.749020,
        lng: -84.389338
    });
    map.setZoom(10);
    var placetoSearch = new google.maps.LatLng({
        lat: coords[0],
        lng: coords[1]
    });

    var request = {
        location: placetoSearch,
        radius: '5000',
        keyword: keyword
    };

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
}


function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        if (list.length > 0) {
            list = [];
            uniqueList = [];
        }
        for (var i = 0; i < results.length; i++) {
            list.push(results[i]['name']);
            complete = true;
        }
        
        $.each(list, function(i, el) {
            if ($.inArray(el, uniqueList) === -1) uniqueList.push(el);
        });
        returnRandom();
    }
}

function getLatLngByZipcode(zipcode) {
    var geocoder = new google.maps.Geocoder();
    var address = zipcode;
    geocoder.geocode({
        'address': address
    }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            var latitude = results[0].geometry.location.lat();
            var longitude = results[0].geometry.location.lng();
            if (coords.length > 0) {
                coords = []
            }
            coords.push(latitude);
            coords.push(longitude);
        }
    });
}

function returnRandom() {
    var placeChose = document.getElementById('chosenPlace');
    placeChose.innerHTML = uniqueList[Math.floor(Math.random() * uniqueList.length)];
}

function showAll() {
    for (var i = 0; i < uniqueList.length; i++) {
        $("#list").append("<p>" + uniqueList[i] + "</p");
    }
}

function clearAll() {
    $("#list").empty();
}