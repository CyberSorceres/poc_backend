const mongoose = require("mongoose");

const Project = require('../schema/projectSchema');
const User = require('./user');
const EpicStory = require("./epicStory");


async function createProject(projectData) {
    try {
      // Crea una nuova istanza del modello User con i dati forniti
      const newProject = new Project(projectData);
      
      // Salva il nuovo utente nel database
      await newProject.save();
  
      console.log('Progect created successfully:', newProject);
        return newProject;
    } catch (error) {
      console.error('Error creating project:', error.message);
    }
  }

  /*Inserimento utenti da terminale, da adattare per il form, problema di connessione
async function insertNewUser(){
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Inserisci il nome del nuovo utente: ', async (name) => {
    rl.question('Inserisci la PASSWORD den nuovo utente: ', async (password)=>{
      rl.question('Inserisci l\'email del nuovo utente: ', async (mail) => {
        rl.question('Inserisci il ruolo del nuovo utente: ', async(role)=>{
          createUser({name, password, mail, role});
          rl.close();

        });
      });
    });
  });
}*/

function findProjectByID(projectId){
    const project = Project.findById(projectId);
    
    if (!project) {
      console.error('Project not found');
      return;
    }
    return project;
}


async function delateProject(projectId){
    try {
        // Trova l'utente con l'ID specificato e elimina il documento
        const result = await Project.deleteOne({ _id: projectId });

        if (result.deletedCount === 1) {
            console.log('Progetto cancellato con successo');
        } else {
            console.error('Nessun progetto trovato con l\'ID specificato');
        }
    } catch (error) {
        console.error('Errore durante la cancellazione del progetto:', error);
    }

}

async function delateFirstProject(){
    const project= await Project.findOne();
    console.log(project._id);
    await delateUser(project._id);
}

function updateNameProject(projectId, newNameProject){
    Project.updateOne({ _id: projectId }, { name: newNameProject}, (err, result) => {
        if (err) {
          console.error('Errore durante la modifica del nome del progetto:'+this._id, err);
        } else {
          console.log('Nome modificato con successo:', result);
        }
      });
}

async function setEndDate(projectId){
    Project.updateOne({_id:projectId}, {endDate: Date.now});
}

async function setValidated(projectId){
    const project = await findProjectByID(projectId);
    if(!project.validate){
        Project.updateOne({_id:projectId}, {validate: true});
        setEndDate(projectId);
        console.log("Il Progetto è stato validato in data: "+project.endDate, project);
    }else{
        console.log("Il Progetto è gia stato validato in data: "+project.endDate);
    }
}


async function checkIfProjectExists(projectId) {
    try {
      // Cerca un progetto con l'ID specificato nel database
      const project = await Project.findById(projectId);
  
      if (project) {
        console.log('Il progetto esiste nel database:', project);
        return true;
      } else {
        console.log('Il progetto non esiste nel database');
        return false;
      }
    } catch (error) {
      console.error('Errore durante la verifica dell\'esistenza del progetto:', error);
      return false;
    }
  }

async function addUserToProject(projectId, userId) {
      // Trova l'utente con l'ID specificato
      const project = await Project.findById(projectId);
      if (!project) {
        console.error('Progetto non trovato');
        return;
      }
      if( User.checkIfUserExists(userId)){
        // Aggiungi il progetto all'array dei progetti dell'utente
        project.user.push(userId);
        //popolate('project').exe() per popolare un progetto ed usare i suoi campi
        await project.save();
        console.log('Utente aggiunto con successo al progetto:', project);
      } else{
        console.error('L\'utente specificato non esiste nel database o si è verificato un errore durante la ricerca.');
      }
  }

  async function delateUserToProject( projectId, userId) {
    try {
        // Trova il progetto con l'ID specificato
        const project = await Project.findById(projectId);
    
        if (!project) {
          console.error('Progetto non trovato');
          return;
        }
    
        // Rimuovi l'utente dall'array degli utente del progetto
        project.user= project.user.filter(user => user.toString() !== userId);
    
        // Salva le modifiche
        await project.save();
    
        console.log('Utente rimosso con successo dal progetto:', project);
      } catch (error) {
        console.error('Errore durante la rimozione dell\'utente dal progetto:', error);
      }
}

async function addEpicStoryToProject(projectId, epicStoryId) {
    // Trova l'utente con l'ID specificato
    const project = await Project.findById(projectId);
    if (!project) {
      console.error('Progetto non trovato');
      return;
    }
    if( EpicStory.checkIfEpicStoryExists(epicStoryId)){
      // Aggiungi il progetto all'array dei progetti dell'utente
      project.epicStory.push(epicStoryId);
      //popolate('project').exe() per popolare un progetto ed usare i suoi campi
      await project.save();
      console.log('Epic story aggiunto con successo al progetto:', project);
    } else{
      console.error('L\'epic story specificato non esiste nel database o si è verificato un errore durante la ricerca.');
    }
}

async function delateEpicStoryToProject( projectId, epicStoryId) {
  try {
      // Trova il progetto con l'ID specificato
      const project = await Project.findById(projectId);
  
      if (!project) {
        console.error('Progetto non trovato');
        return;
      }
  
      // Rimuovi l'utente dall'array degli utente del progetto
      project.epicStory= project.epicStory.filter(epicStory => epicStory.toString() !== epicStoryId);
  
      // Salva le modifiche
      await project.save();
  
      console.log('L\'epic story e\' stata rimossa con successo dal progetto:', project);
    } catch (error) {
      console.error('Errore durante la rimozione dell\'epic story dal progetto:', error);
    }
}

module.exports = { createProject, delateProject, delateFirstProject, updateNameProject, checkIfProjectExists, setValidated, addUserToProject, delateUserToProject, addEpicStoryToProject, delateEpicStoryToProject };
