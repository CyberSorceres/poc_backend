const mongoose = require('mongoose');

const userStorySchema = new mongoose.Schema({
    descript: { 
        type: String,
        require: true 
    },
    state: { 
        type: Boolean, 
        default: false,
        description: 'indica lo stato dell\'epic story',
    },
    epicStory: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'epicStory' 
    }
    
});

const UserStory = mongoose.model('userStory', userStorySchema);

module.exports = UserStory;

