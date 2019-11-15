var db = require("../models");

// Pull in routes to retrieve external search data
var hotelAPI = require("../externalRoutes/bookingAPI.js");
var flightAPI = require("../externalRoutes/skyscannerAPI.js");

//const axios = require("axios");

module.exports = function(app) {
  // Get all in booking table
  app.get("/api/search/:name", function(req, res) {
    db.Bookings.findAll({
      where: {
        name: req.params.name
      }
    }).then(function(dbbooking) {
      res.render("index", {
        bookings: dbbooking
      });
    });
  });

  // Create a new search
  app.post("/api/search/", async function(req, res) {
    console.log(req.body)

    let flightInfo = await flightAPI.searchFlights(req.body);
    let arrivalDate = flightInfo.outboundArrivalTime.slice(0, 10);
    let destID = req.body.destID;

    let departureDate = req.body.return;
    let roomInfo = await hotelAPI.getHotel(destID, arrivalDate, departureDate);

    let searchResult = {
      name: req.body.name,
      destination: req.body.destination,
      departureDate: req.body.departure,
      returnDate: departureDate,
      flightPrice: flightInfo.price,
      airline: flightInfo.airline,
      outFlightTime: flightInfo.outboundDepartureTime,
      inFlightTime: flightInfo.inboundDepartureTime,
      hotelName: roomInfo.hotel,
      checkinDate: arrivalDate,
      checkoutDate: departureDate,
      hotelPrice: roomInfo.price,
      hotelURL: roomInfo.url
    };

    db.Bookings.create(searchResult).then(function(dbbooking) {
      console.log(dbbooking);
      res.json(dbbooking);
    });
  });

  // Delete an example by id
  app.delete("/api/search/:id", function(req, res) {
    db.Booking.destroy({ where: { id: req.params.id } }).then(function(dbbooking) {
      res.json(dbbooking);
    });
  });
};
