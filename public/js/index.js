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

$(document).ready(function() {
  $(".pickupLocation").change(function() {
    zip = $(".pickupLocation").val();
    console.log(zip);
    var address = parseInt(zip);
    $.ajax({
      url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + address,
      method: "GET"
    }).then(function(response){
      console.log(response);
      lat = response.results[0].geometry.location.lat;
      lng = response.results[0].geometry.location.lng;
      console.log(lat, lng);
    })
  });

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
        var url = "https://api.sandbox.amadeus.com/v1.2/cars/search-circle?apikey=fMUHkOJ5X8vyjqCHnzz4D94FG8rfPMxc&latitude=" + lat + "&longitude=" + lng + "&radius=42&pick_up=" + startDate1 + "&drop_off=" + endDate1;

        $.ajax({
          url: url,
          method: "GET"
        }).then(function(response){
          console.log(response.results[0].cars[0].vehicle_info.acriss_code);

          var carsResponse = response.results[0].cars
          var carsLength = response.results[0].cars.length;
        
          console.log("Cars Info", carsResponse);
          
          var $showResults = $(".showresults");
          var newCol = $("<div class=\" col s12 m6>\"");
          var newCard = $("<div class=\"card sticky-action large blue-grey darken-1\">")
          var newcardImageDiv = $("<div class=\"card-image\">")
          var cardImage = $("<img")

          for (var i = 0; i < carsLength; i++) {
            var dailyTotal =  carsResponse[i].estimated_total.amount;
            var airconditioning = carsResponse[i].vehicle_info.air_conditioning;
            var category = carsResponse[i].vehicle_info.category;
            var fuel = carsResponse[i].vehicle_info.fuel;
            var transmission = carsResponse[i].vehicle_info.transmission;
            var doors = carsLength[i].vehicle_info.type;

            $showResults.append(
              newCol,
              newCard,
              newcardImageDiv,
              
            )
          }

          // $(".showresults").show();
        });
    });
  });
