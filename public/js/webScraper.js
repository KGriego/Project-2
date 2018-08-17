var request = require("request");
var cheerio = require("cheerio");

// Advantage list of cars
request("https://www.advantage.com/vehicles/", function (error, response, html) {
  if (!error && response.statusCode === 200) {
    var $ = cheerio.load(html);
    $('div.aez-title-similar').each(function (i) {
      var model = $(this).find("h2").text();
      var imgSrc = $(this).parent().parent().children(".aez-car-cell-img").find("img").attr("src");
      var transmission = $(this).parent().parent().children(".aez-mini-details").children().children(".fa-road").siblings("p").text();
      // var mpg = $(this).parent().parent().children(".aez-mini-details").children().children(".fa-tachometer").siblings("p").text();
      var baggageSpace = $(this).parent().parent().children(".aez-mini-details").children().children(".fa-suitcase").siblings("p").text();
      var people = $(this).parent().parent().children(".aez-mini-details").children().children(".fa-users").siblings("p").text();

      var car = {
        model: model,
        imgSrc: imgSrc,
        transmission: transmission,
        baggageSpace: parseInt(baggageSpace),
        people: parseInt(people)
      }
      console.log(JSON.stringify(car, null, 2));
    });
  }
});

//Sixt list of cars
request("https://www.sixt.com/fleet-guide/", function(error, response, html) {
  if (!error && response.statusCode === 200) {
    var $ = cheerio.load(html);

    $("li.sx-fleetlist-item").each(function(i) {
      var model = $(this).find("h3").text().trim();
      var imgSrc = $(this).find("img").attr("src").trim();
      var transmission = $(this).find("li.sx-equipment-transmission").text();
      var baggageSpace = $(this).find("li.sx-equipment-case_big").text().trim();
      var people = $(this).find("li.sx-equipment-seats").text().trim();

      var car = {
        model: model,
        imgSrc: imgSrc,
        transmission: transmission.replace("Transmission", ""),
        baggageSpace: parseInt(baggageSpace.replace(/Suitcases/g,"").trim()),
        people: parseInt(people.replace(/Seats/g,"").trim())
      }

      console.log(JSON.stringify(car, null, 2));

    });
  }
});

request("https://www.e-zrentacar.com/vehicles/", function (error, response, html) {
  if (!error && response.statusCode === 200) {
    var $ = cheerio.load(html);
    $('div.aez-title-similar').each(function (i, element) {
      var model = $(this).find("h2").text();
      var imgSrc = $(this).parent().parent().children(".aez-car-cell-img").find("img").attr("src");
      var transmission = $(this).parent().parent().children(".aez-mini-details").children().children(".fa-road").siblings("p").text();
      // var mpg = $(this).parent().parent().children(".aez-mini-details").children().children(".fa-tachometer").siblings("p");
      var baggageSpace = $(this).parent().parent().children(".aez-mini-details").children().children(".fa-suitcase").siblings("p").text();
      var people = $(this).parent().parent().children(".aez-mini-details").children().children(".fa-users").siblings("p").text();

      var car = {
        model: model,
        imgSrc: imgSrc,
        transmission: transmission,
        baggageSpace: parseInt(baggageSpace),
        people: parseInt(people)
      }
      console.log(JSON.stringify(car, null, 2));
    });
  }
});

// Hertz Rent a Car

// var hertzArray = ["Green%20Traveler%20Collection", "Prestige%20Collection", "Adrenaline%20Collection", "Dream%20Cars", "Car/Sedan", "Wagon/Estate", "SUV/Minivan/4x4", "Convertible", "Commercial%20Van/Truck"];
// for (var i = 0; i< hertzArray.length; i++) {
  
// }

// request("https://www.hertz.com/rentacar/vehicleguide/index.jsp?targetPage=vehicleGuideHomeView.jsp&countryCode=US&category="+"Prestige%20Collection", function(error, response, html) {
//   if (!error && response.statusCode === 200) {
//     var $ = cheerio.load(html);

//     $("div.vgSippDescription").each(function(i) {
//       var model = $(this).text().trim();
//       // var imgSrc = $(this).find("img").attr("src").trim();
//       // var transmission = $(this).find("li.sx-equipment-transmission").text();
//       // var baggageSpace = $(this).find("li.sx-equipment-case_big").text().trim();
//       // var people = $(this).find("li.sx-equipment-seats").text().trim();

//       var car = {
//         model: model,
//         // imgSrc: imgSrc,
//         // transmission: transmission.replace("Transmission", ""),
//         // baggageSpace: parseInt(baggageSpace.replace(/Suitcases/g,"").trim()),
//         // people: parseInt(people.replace(/Seats/g,"").trim())
//       }

//       console.log(JSON.stringify(car, null, 2));

//     });
//   }
// });