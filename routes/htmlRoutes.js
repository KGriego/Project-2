var db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/index");
    } else {
      res.render("login", {layout: "login"});
    }
  })

  app.get("/signUp", function(req, res) {
    res.render("signUp", {layout: "signup"})
  })

  app.get("/home", isAuthenticated, function(req, res) {
    res.render("index", {layout: "main"});
  });

  app.get("/index", function(req, res) {
    res.render("index");
  });

  // Render 404 page for any unmatched routes
  // app.get("*", function(req, res) {
  //   res.render("404");
  // });
};
