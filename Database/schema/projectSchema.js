const mongoose = require('mongoose');
//const epicStory=require("./epicStorySchema");

const projectSchema = new mongoose.Schema({
    name:{
        type: String, 
        description: 'Inserire il nome del progetto',
        required: true
    },

    validation:{
        type: Boolean, 
        description: 'Inserire se il progetto è stato validato o no',
        required: true,
        default: false
    },
    startDate:{
        type: Date,
        description: 'Inserire la data di inizio del progetto',
        required: true,
        default: Date.now
    },
    endDate:{
        type: Date,
        description: 'Inserire la data di fine del progetto',
        default: null,
    },
    epicStory:[{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'epicStory'
    }],
    user:[{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user'
    }]
});

const Project = mongoose.model('project', projectSchema);

module.exports = Project;

