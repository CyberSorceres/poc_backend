const mongoose = require('mongoose');
const epicStory=require("./epicStory");

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
    }]
});

const Project = mongoose.model('project', projectSchema);

module.exports = Project;

