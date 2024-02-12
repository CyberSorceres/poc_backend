const mongoose = require('mongoose');

const epicStorySchema = new mongoose.Schema({
    title:{
        type: String,
        require: true 
    },
    descript: { 
        type: String,
        require: true 
    },
    state: { 
        type: Boolean, 
        default: false,
        description: 'indica lo stato dell\'epic story',
    },
    project: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'project' 
    },
    userStory:[{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'userStory'
    }]
    
});

const EpicStory = mongoose.model('epicStory', epicStorySchema);

module.exports = EpicStory;

