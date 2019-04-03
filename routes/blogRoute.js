
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

//direct to edit Blog form
router.get("/:id/edit", function(req, res) {
    Blog.findById(req.params.id, function(err, foundBlog) {
        res.render("editBlog", {blog: foundBlog})
    })
})

//Edit Blog
router.put("/:id", function(req, res) {
    Blog.findByIdAndUpdate(req.params.id, req.body.blog ,function(err, updateBlog) {
        if(err) {
            console.log(err)
        } else {
            res.redirect("/");
        }
    });
});

//delete Blog
router.delete("/:id", function(req, res) {
    Blog.findByIdAndRemove(req.params.id, function(err) {
        if(err) {
            console.log(err);
        } else {
            res.redirect("/");
        }
    });
});

module.exports = router;