var express = require("express"),
    app = express(),
    port = process.env.PORT || 3000,
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    expressSanitizer = require("express-sanitizer"),
    passport = require("passport"),
    localStrategy = require("passport-local");
  
//connect to models for data  
var Skill = require("./models/skills.js"),
    Blog = require("./models/blogs.js"),
    User = require("./models/user.js");
    
//connect to routers folder
var indexRoutes = require("./routes/index.js"),
    blogRoutes = require("./routes/blogRoute.js"),
    resumeRoutes = require("./routes/resumeRoute.js");
    
//for connect to localhost mongodb and mLab
var url = process.env.DATABASEURL || "mongodb://localhost:27017/blog_app";
mongoose.connect(url, { useNewUrlParser: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));
app.set("view engine", "ejs");

//passport configuration
app.use(require("express-session")({
    secret: "hamster is a very cute animal",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

//let system know we want to use these routes
app.use(indexRoutes);
app.use(blogRoutes);
app.use(resumeRoutes);

app.listen(port, function() {
    console.log("server is running");
});


