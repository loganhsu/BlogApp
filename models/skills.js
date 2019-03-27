
var mongoose = require("mongoose");
    
var skillSchema = new mongoose.Schema({
    skillName: String,
    skillRate: String
});

module.exports = mongoose.model("Skill", skillSchema);
