var express = require("express"),
    app = express(),
    port = process.env.PORT || 3000,
    bodyParser = require("body-parser")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));

app.get("/", function(req, res) {
    res.render("index.ejs");
});

app.get("/resume", function(req, res) {
    res.render("resume.ejs");
});

app.get("/register", function(req, res) {
    res.render("register.ejs");
});

app.get("/login", function(req, res) {
    res.render("login.ejs");
});

app.listen(port, function() {
    console.log("server is running");
});


