
var express = require("express"),
    router = express.Router(),
    Blog = require("../models/blogs.js")
    
//direct to a form for create a new blog
router.get("/new", function(req, res) {
    res.render("newBlog");
});

//add a new blog to main page
router.post("/", function(req, res) {
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

module.exports = router;