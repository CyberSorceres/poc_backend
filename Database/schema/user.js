const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String, 
        maxlength: 30,
        description: 'Inserire il proprio nome o quello dell\'azienda',
        required: true
    },
    password:{
        type: String, 
        description:'La password deve essere almeno di 8 caratteri e non più di 1',
        minLength: 8,
        maxLength: 15,
        required: true

    },
    role:{
        type: String, 
        enum:['project manager', 'sviluppatore', 'cliente'],
        description:'Si inserisca uno dei seguenti ruoli di appartenenza: project manager, sviluppatore o cliente' ,
        required: true,
        default: 'cliente'

    },
    mail:{
        type: String, 
        match: /^\S+@\S+\.\S+$/,
        description: 'Deve essere un indirizzo email valido',
        required: true

    }
});

const User = mongoose.model('user', userSchema);

module.exports = User;

