const mongoose = require('mongoose');
const user= require('./user');
const project= require('./project');


const user_projectSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user' 
    },
    project: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'project' 
    }
    
});

const UserProject = mongoose.model('user_project', user_projectSchema);

module.exports = UserProject;

