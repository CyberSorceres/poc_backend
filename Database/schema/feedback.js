const mongoose = require('mongoose');
const user=require("./userSchema");
const userStory=require("./userStory");

const feedbackSchema = new mongoose.Schema({
    text:{
        type: String, 
        description: 'Inserire il commento',
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'user'
    },
    userStory:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'userStory'
    }
});    

const Feedback = mongoose.model('feedback', feedbackSchema);

module.exports = Feedback;

