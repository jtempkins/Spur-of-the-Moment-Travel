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
  app.get("/booking/:id", function(req, res) {
    db.Bookings.findOne({ where: { id: req.params.id } }).then(function(
      dbbooking
    ) {
      res.rend("booking", {
        booking: dbbooking
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
