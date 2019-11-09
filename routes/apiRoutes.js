var db = require("../models");
var API = require("../public/js/index");
// var bookings = require("./bookingApi");
const axios = require("axios");

module.exports = function(app) {
  // Get all in booking table
  app.get("/api/booking", function(req, res) {
    db.Booking.findAll({}).then(function(dbbooking) {
      res.json(dbbooking);
    });
  });

  // Create a new example
  app.post("/api/booking", function(req, res) {
    Bookings = function (callback) {
      axios({
        "method": "GET",
        "url": "https://apidojo-booking-v1.p.rapidapi.com/properties/list",
        "headers": {
          //  "content-type":"application/octet-stream",
          "x-rapidapi-host": "apidojo-booking-v1.p.rapidapi.com",
          "x-rapidapi-key": "73fa84054dmsh20d3801b69bc360p1468bdjsn1cafe41c4f3b"
        }, "params": {
          "price_filter_currencycode": "USD",
          "categories_filter": "price::9-40,class::1,class::0,class::2",
          "search_id": "none",
          "order_by": "popularity",
          "languagecode": "en-us",
          "search_type": "city",
          "dest_ids": req.body.destination,
          "arrival_date": req.body.arrival,
          "departure_date": req.body.departure,
        }
      })
        .then((response) => {
    
          var array01 = response.data.result;
          var array02 = array01.map(
            function (item) {
              try {
                return { hotel: item.hotel_name, price: item.price_breakdown.gross_price, url: item.url }
              } catch (error) {
                console.log(error)
    
              }
            }).filter(x => x !== undefined);;
          console.log(array02)
          callback(array02[0]);
        })
        .catch((error) => {
          console.log(error)
        });
    }
    db.Bookings.create(req.body).then(function(dbbooking) {
      res.json(dbbooking);
    });
  });

  // Delete an example by id
  app.delete("/api/booking/:id", function(req, res) {
    db.Booking.destroy({ where: { id: req.params.id } }).then(function(dbbooking) {
      res.json(dbbooking);
    });
  });
};
