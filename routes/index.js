
var express = require("express"),
    router = express.Router(),
    User = require("../models/user.js"),
    Blog = require("../models/blogs.js"),
    passport = require("passport");
    
//for connect to main page
router.get("/", function(req, res) {
    Blog.find({}, function(err, blogs) {
        if(err) {
            console.log("server connect error");
        } else {
            res.render("index", {blogs: blogs})
        }
    })
});

//================
//  Auth Routes
//================

//direct to register form
router.get("/register", function(req, res) {
    res.render("register", {page: 'register'});
});

//add a new user
router.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    
    User.register(newUser, req.body.password, function(err, user) {
        if(err) {
            console.log(err);
            return res.render("register", {error: err.message});
        } 
        passport.authenticate("local")(req, res, function() {
            res.redirect("/");
        });
    });
});

//direct to login form
router.get("/login", function(req, res) {
    res.render("login", {page: 'login'});
});

//route for confirm login data
router.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
}), function(req, res) {
});

//logout route
router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
});

module.exports = router;
