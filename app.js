var express = require("express"),
    app = express(),
    port = process.env.PORT || 3000,
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    expressSanitizer = require("express-sanitizer");
    
var Skill = require("./models/skills.js"),
    Blog = require("./models/blogs.js");
    
//for connect to localhost mongodb
mongoose.connect('mongodb://localhost:27017/blog_app', { useNewUrlParser: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));
app.set("view engine", "ejs");

//connect to home page and list all of the blogs
app.get("/", function(req, res) {
    Blog.find({}, function(err, blogs) {
        if(err) {
            console.log("server connect error");
        } else {
            res.render("index", {blogs: blogs})
        }
    })
});

//direct to a form for create a new blog
app.get("/new", function(req, res) {
    res.render("newBlog");
});

//add a new blog to main page
app.post("/", function(req, res) {
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog, function(err, newBlog) {
        if(err) {
            console.log("server connect error");
            res.render("newBlog");
        } else {
            res.redirect("/");
        }
    })
})

//connect to resume page and load all of the skill
app.get("/resume", function(req, res) {
    Skill.find({}, function(err, allSkills) {
        if(err) {
            console.log("Server connected error")
        } else {
            res.render("resume", {skills: allSkills});
            console.log("Success");
        }
    })
})

//for add a new skill to resume
app.post("/resume", function(req, res) {
    Skill.create(req.body.skill, function(err, skill) {
        if(err) {
            console.log("server connect error")
        } else {
            skill.save();
            console.log("add success");
            res.redirect("/resume");
        }
    })
})

app.get("/register", function(req, res) {
    res.render("register");
});

app.get("/login", function(req, res) {
    res.render("login");
});

app.listen(port, function() {
    console.log("server is running");
});


