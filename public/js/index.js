// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");
var startDate1;
var endDate1;
var pickUpTime1;
var dropOffTime1;
var zip;
var lat;
var lng;
//var db = require("../../models");

function xmlToJson(xml) {
  // Create the return object
  var obj = {};

  if (xml.nodeType == 1) {
    // element
    // do attributes
    if (xml.attributes.length > 0) {
      obj["@attributes"] = {};
      for (var j = 0; j < xml.attributes.length; j++) {
        var attribute = xml.attributes.item(j);
        obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
      }
    }
  } else if (xml.nodeType == 3) {
    // text
    obj = xml.nodeValue;
  }

  // do children
  if (xml.hasChildNodes()) {
    for (var i = 0; i < xml.childNodes.length; i++) {
      var item = xml.childNodes.item(i);
      var nodeName = item.nodeName;
      if (typeof obj[nodeName] == "undefined") {
        obj[nodeName] = xmlToJson(item);
      } else {
        if (typeof obj[nodeName].push == "undefined") {
          var old = obj[nodeName];
          obj[nodeName] = [];
          obj[nodeName].push(old);
        }
        obj[nodeName].push(xmlToJson(item));
      }
    }
  }
  return obj;
}

$(document).ready(function() {
  $(".dropdown-trigger").dropdown({
    closeOnClick: false
  });
  $(".sidenav").sidenav();

  var currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 1);

  $("#pickupDate").datepicker({
    dateFormat: "yy-mm-dd",
    minDate: currentDate,
    onSelect: function(dateText, inst) {
      $("#dropoffDate").datepicker(
        "option",
        "minDate",
        $("#pickupDate").datepicker("getDate")
      );
      startDate1 = dateText;
      console.log("Pick up date: ", startDate1);
    }
  });

  $("#dropoffDate").datepicker({
    dateFormat: "yy-mm-dd",
    minDate: $("#pickupDate").datepicker("getDate"),
    onSelect: function(endDate, inst) {
      console.log("End Date MM/DD/YYYY: " + endDate);
      endDate1 = endDate;
      return endDate;
    }
  });

  $("#pickupTime").timepicker({
    ampm: true,
    format: "g:i A",
    onSelect: function(pickUpTime, inst) {
      if (inst < 10) {
        pickUpTime1 = pickUpTime + ":0" + inst;
      } else {
        pickUpTime1 = pickUpTime + ":" + inst;
      }
      //console.log(pickUpTime1);
      console.log("Drop Off Time: " + pickUpTime1, inst);
      return pickUpTime1;
    }
  });

  $("#dropoffTime").timepicker({
    ampm: true,
    format: "g:i A",
    onSelect: function(dropOffTime, inst, a) {
      console.log("Drop Off Time: " + dropOffTime, inst);
      if (inst < 10) {
        dropOffTime1 = dropOffTime + ":0" + inst;
      } else {
        dropOffTime1 = dropOffTime + ":" + inst;
      }
      console.log(dropOffTime1);
      return dropOffTime1;
    }
  });

  $("#findCars").on("click", function() {
    zip = $(".pickupLocation").val();
    console.log(zip);
    var address = parseInt(zip);
    var lat = 33.4367;
    var lng = -111.9403;
    // $.ajax({
    //   url:
    //     "https://maps.googleapis.com/maps/api/geocode/json?address=" + address,
    //   method: "GET"
    // }).then(function(response) {
    //   console.log(response);
    //   lat = response.results[0].geometry.location.lat;
    //   lng = response.results[0].geometry.location.lng;
    //   console.log(lat, lng);
    // }).then(function(){
    var url =
      "https://api.sandbox.amadeus.com/v1.2/cars/search-circle?apikey=fMUHkOJ5X8vyjqCHnzz4D94FG8rfPMxc&latitude=" +
      lat +
      "&longitude=" +
      lng +
      "&radius=42&pick_up=" +
      startDate1 +
      "&drop_off=" +
      endDate1;

    $.ajax({
      url: url,
      method: "GET"
    }).then(function(response) {
      var approvedCompanies = ["ADVANTAGE", "SIXT", "EZ RAC"];
      console.log("Cars Info", response.results);
      var myCars;
      var rentCars = [];
      var apiInfo = [];
      const set1 = new Set([]);
      $.get("api/cars", function(carDetails) {
        myCars = carDetails;
        console.log(myCars);
      })
        .then(function() {
          for (var i = 0; i < response.results.length; ++i) {
            if (
              approvedCompanies.indexOf(
                response.results[i].provider.company_name
              ) >= 0
            ) {
              console.log(response.results[i].provider.company_name);
              for (var j = 0; j < response.results[i].cars.length; ++j) {
                var apiCar = response.results[i].cars[j];
                console.log(apiCar);
                apiInfo.push(apiCar);
                set1.add(apiCar.vehicle_info.acriss_code);
              }
            }
          }
          console.log(set1);
          set1.forEach(function(index, element) {
            $.get("api/cars/" + element, function(response3) {
              console.log("api/cars/" + element, "Response", index, response3);
              for (var i = 0; i < response3.length; ++i) {
                rentCars.push(response3[i]);
                var newCard = $("<div id='card'" + i + ">");
                var imgURL;
                var searchTerm = "";
                for (var j = 0; j < response3[i].model.length; ++j) {
                  if (response3[i].model[j] === " ") {
                    searchTerm += "+";
                  } else {
                    searchTerm += response3[i].model[j];
                  }
                }

                $.ajax({
                  url:
                    "https://www.carimagery.com/api.asmx/GetImageUrl?searchTerm=" +
                    searchTerm,
                  method: "GET"
                }).then(function(response1) {
                  console.log(rentCars[i]);
                  console.log("Api Info", apiInfo[i]);
                  var json = response1;
                  imgURL = xmlToJson(json).string["#text"];
                  newCard.append(
                    $("<div class='card-title'>").text(
                      "Model: " + rentCars[i].model
                    )
                  );
                  newCard.append($("<img id='card-image' src=" + imgURL + ">"));
                  console.log(apiInfo[i]);
                  newCard.append($("<br><i class='fas fa-suitcase' style='float:right'>"));
                  newCard.append(
                    $("<div class='card-title'>").text(
                      "Baggage Space: " + rentCars[i].baggageSpace
                    )
                  );
                  newCard.append($("<i class='fas fa-users' style='float:right'>"));
                  newCard.append(
                    $("<div class='card-title'>").text(
                      "Passenger Capacity: " + rentCars[i].people
                    )
                  );
                  newCard.append($("<i class='fas fa-dollar-sign' style='float:right'>"));

                  newCard.append(
                    $("<div class='card-title' id='cost'>").text(
                      "Estimated Price: $" + apiInfo[i].estimated_total.amount
                    )
                  );
                  newCard.append($("<i class='fas fa-car' style='float:right'>"));
                  newCard.append(
                    $("<div class='card-title' id='transmission'>").text(
                      "Transmission: " + apiInfo[i].vehicle_info.transmission
                    )
                  );
                  //newCard.append($("<i class='fal fa-tire'></i>"));
                  newCard.append(
                    $("<div class='card-title' id='ac'>").text(
                      "Air conditioning: " +
                        apiInfo[i].vehicle_info.air_conditioning
                    )
                  );
                  newCard.append(
                    $("<div class='card-title' id='company'>").text(
                      "Renting company: " +
                      rentCars[i].company
                    )
                  );
                  newCard.append($("<button id='reserve'>").text("Reserve Now").on("click", function(){
                    //console.log($(this).parent().find('#cost').text());
                    window.location.href = "/payment";
                  }));
                  newCard.append($("<br><br>"));
                  $("#resultsContainer").append(newCard);
                });

              }
            });
          });
          console.log(rentCars);
        })
        .then(function() {
          console.log(apiInfo);
        });
    });
  });
});
