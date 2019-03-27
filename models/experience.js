
var mongoose = require("mongoose");
    
var experienceSchema = new mongoose.Schema({
    jobTitle: String,
    companyName: String,
    startDate: Date,
    endDate: Date,
    responsibilities: {
        res1: String,
        res2: String,
        res3: String,
        res4: String,
        res5: String
    }
});

module.exports = mongoose.model("Experience", experienceSchema);
