const mongoose = require("mongoose");
require("dotenv").config();
const readline = require("readline");

const dbURI =
  "mongodb+srv://cybersorcerers23:" +
  process.env.PASSWORD_DB +
  "@cybersorcerersdb.oletifm.mongodb.net/cybersorcerersDB?retryWrites=true&w=majority";
const User = require("./method/user");
const Con = require("./method/connection");
const user = require("./schema/userSchema");
const project = require("./schema/projectSchema");

const Project = require("./schema/projectSchema");
const UserProject = require("./schema/user_project");

/*const run= async()=>{
  mongoose.set('strictQuery', true);
  await mongoose.connect(dbURI);
  console.log("Connesso");
};

run();*/

async function createProject(projectData) {
  try {
    // Crea una nuova istanza del modello User con i dati forniti
    const newProject = new Project(projectData);

    // Salva il nuovo utente nel database
    await newProject.save();

    console.log("Project created successfully:", newProject);
  } catch (error) {
    console.error("Error creating user:", error.message);
  }
}

/* estrapolazione user_id e project_id dal form
async function assignProject(utente, project){
  console.log('Il nome è :', utente.name, 'L\'id è:', utente._id);
  if(User.countDocuments({name: utente.name})>0){
    if( Project.countDocuments({name: project.name})>0){
    const user_id= utente._id;
    const project_id=project._id;

    createUserProject({user_id, project_id});
    }else{
    console.log("Non esiste il progetto");
    }
  }else{
    console.log("Non esiste l\'utente");
  }
}
*/

async function createUserProject(userprojectData) {
  try {
    // Crea una nuova istanza del modello User con i dati forniti
    const newUserProject = new UserProject(userprojectData);

    // Salva il nuovo utente nel database
    await newUserProject.save();

    console.log("UserProject created successfully:", newUserProject);
  } catch (error) {
    console.error("Error creating user:", error.message);
  }
}

async function main() {
  await Con.connection();

  /*const userData = {
    name: 'John',
    password: '12345678',
    role: 'project manager',
    mail: 'projectmanager@gmail.com',
  };



  const usercreaed=await User.createUser(userData);

  const projectData = new Project({ name: 'Project 1', user: usercreaed._id});
    // Salvataggio del progetto nel database
    await projectData.save();*/
  /*const user = await User.findOne({ name: 'John' });
    console.log('Il nome è :', user.name, 'L\'id è:', user._id);
        iduser = user._id;
   
      const project = await Project.findOne({ name: 'Project 1' });
        idproject = project._id;
      
  const userProject = new UserProject({ user: idproject , project: idproject });

// Salvataggio della relazione nel database
await  userProject.save();
*/
  // await insertNewUser();
  //await createUserProject(projectData._id,projectData._id );

  /*const story = await Project.
  findOne({ _id: projectData._id  }).
  populate('user').
  exec();

  console.log(story.user.name);*/
  await User.delateFirstUser();

  await Con.disconnect();
}

main();
