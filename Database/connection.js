const mongoose = require("mongoose");
require("dotenv").config();


const dbURI='mongodb+srv://cybersorcerers23:'+process.env.PASSWORD_DB+'@cybersorcerersdb.oletifm.mongodb.net/cybersorcerersDB?retryWrites=true&w=majority';
const User = require('./schema/user');
const Project = require('./schema/project');
const UserProject = require('./schema/user_project');



/*const run= async()=>{
  mongoose.set('strictQuery', true);
  await mongoose.connect(dbURI);
  console.log("Connesso");
};

run();*/

function connection(){
  mongoose.connect(dbURI).then(() => {
    console.log("Connesso");
  }).catch(error => {
    console.error('Errore durante l\'inserimento utente:', error);
})
  
}

function disconnect(){
  if(mongoose.disconnect()){
    console.log("Disconnesso");
  }else{
    console.log("Sei ancora connesso");
  }
}

async function createUser(userData) {
  try {
    // Crea una nuova istanza del modello User con i dati forniti
    const newUser = new User(userData);
    
    // Salva il nuovo utente nel database
    await newUser.save();

    console.log('User created successfully:', newUser);
  } catch (error) {
    console.error('Error creating user:', error.message);
  }
}



async function main(){
  await connection();

 /* const userData = {
    name: 'John',
    password: '12345678',
    role: 'project manager',
    mail: 'projectmanager@gmail.com',
  };



  await createUser(userData);*/

 /* const projectData = new Project({ name: 'Project 1'});
    // Salvataggio del progetto nel database
    await projectData.save();*/
    const user = await User.findOne({ name: 'John' });
    console.log('Il nome è :', user.name, 'L\'id è:', user._id);
        iduser = user._id;
      
      const project = await Project.findOne({ name: 'Project 1' });
        idproject = project._id;
      
  const userProject = new UserProject({ user: iduser , project: idproject });

// Salvataggio della relazione nel database
await  userProject.save();

  await disconnect();
}

main();
