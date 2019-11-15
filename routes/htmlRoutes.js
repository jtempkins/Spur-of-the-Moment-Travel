var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Bookings.findAll({}).then(function(dbbooking) {
      res.render("index", {
        msg: "Welcome!",
        booking: dbbooking
      });
    });
  });

  // Load example page and pass in an example by id
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

  // Load example page and pass in an example by id
  app.get("/api/quote/:id", function(req, res) {
    db.Bookings.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbquote) {
      res.render("quote", {
        quote: dbquote
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
