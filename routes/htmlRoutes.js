var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("index", {layout: "signup"});
  });

  app.get("/login", function(req, res) {
    res.render("login");
  });

  app.get("/findCar", function(req, res) {
    res.render("findCar");
  });

  app.get("/locations", function(req, res) {
    res.render("locations");
  });

  app.get("/signUp", function(req, res) {
    res.render("signUp");
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
