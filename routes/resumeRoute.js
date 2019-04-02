
var express = require("express"),
    router = express.Router(),
    Skill = require("../models/skills.js")
    
//connect to resume page and load all of the skill
router.get("/resume", function(req, res) {
    Skill.find({}, function(err, allSkills) {
        if(err) {
            console.log("Server connected error")
        } else {
            res.render("resume", {skills: allSkills});
        }
    })
})

//for add a new skill to resume
router.post("/resume", function(req, res) {
    Skill.create(req.body.skill, function(err, skill) {
        if(err) {
            console.log("server connect error")
        } else {
            skill.save();
            res.redirect("/resume");
        }
    })
})

module.exports = router;
