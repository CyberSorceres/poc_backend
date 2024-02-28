import mongoose from "mongoose";
import EpicStory from "../schema/epicStorySchema";
import Project from "./project";

export async function createEpicStory(epicStoryData) {
  try {
    // Crea una nuova istanza del modello Epic Story con i dati forniti
    const newEpicStory = new EpicStory(epicStoryData);

    // Salva la nuova epic story nel database
    await newEpicStory.save();

    console.log("Epic Story created successfully:", newEpicStory);
    return newEpicStory;
  } catch (error) {
    console.error("Error creating epic story:", error.message);
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

export function findEpicStoryByID(epicStoryId) {
  const epicStory = Project.findById(epicStoryId);

  if (!epicStory) {
    console.error("Epic Story not found");
    return;
  }
  return epicStory;
}

export async function delateEpicStory(epicStoryId) {
  try {
    // Trova l'utente con l'ID specificato e elimina il documento
    const result = await EpicStory.deleteOne({ _id: epicStoryId });

    if (result.deletedCount === 1) {
      console.log("Epic Story cancellato con successo");
    } else {
      console.error("Nessuna Epic Story trovato con l'ID specificato");
    }
  } catch (error) {
    console.error("Errore durante la cancellazione del'epic story:", error);
  }
}

export async function delateFirstEpicStory() {
  const epicStory = await EpicStory.findOne();
  console.log(epicStory._id);
  await delateEpicStory(epicStory._id);
}

export function updateTitleEpicStory(epicStoryId, newTitle) {
  EpicStory.updateOne(
    { _id: epicStoryId },
    { title: newTitle },
    (err, result) => {
      if (err) {
        console.error(
          "Errore durante la modifica del titolo dell'epic story:" + this._id,
          err,
        );
      } else {
        console.log("Titolo modificato con successo:", result);
      }
    },
  );
}

export function updatedescriptionEpicStory(epicStoryId, newDespription) {
  EpicStory.updateOne(
    { _id: epicStoryId },
    { descript: newDespription },
    (err, result) => {
      if (err) {
        console.error(
          "Errore durante la modifica della descrizione dell'epic story:" +
            this._id,
          err,
        );
      } else {
        console.log("Descrizione modificato con successo:", result);
      }
    },
  );
}
//da capire cosa serve nello stato
/*async function setStatus(epicStoryId){
    const epicStory = await findEpicStoryByID(epicStory);
    if(!project.validate){
        Project.updateOne({_id:projectId}, {validate: true});
        setEndDate(projectId);
        console.log("Il Progetto è stato validato in data: "+project.endDate, project);
    }else{
        console.log("Il Progetto è gia stato validato in data: "+project.endDate);
    }
}
*/

export async function checkIfEpicStoryExists(epicStoryId) {
  try {
    // Cerca un progetto con l'ID specificato nel database
    const epicStory = await EpicStory.findById(epicStoryId);

    if (epicStory) {
      console.log("L'epic story esiste nel database:", epicStory);
      return true;
    } else {
      console.log("L'epic story non esiste nel database");
      return false;
    }
  } catch (error) {
    console.error(
      "Errore durante la verifica dell'esistenza del'epic story:",
      error,
    );
    return false;
  }
}

export async function addProjectToEpicStory(epicStoryId, projectId) {
  // Trova l'utente con l'ID specificato
  const epicStory = await EpicStory.findById(epicStoryId);
  if (!epicStory) {
    console.error("Epic Story non trovata");
    return;
  }
  if (Project.checkIfProjectExists(projectId)) {
    // Aggiungi il progetto all'array dei progetti dell'utente
    epicStory.project.push(projectId);
    //popolate('project').exe() per popolare un progetto ed usare i suoi campi
    await epicStory.save();
    console.log("Progetto aggiunto con successo all'epic story:", epicStory);
  } else {
    console.error(
      "Il progetto specificato non esiste nel database o si è verificato un errore durante la ricerca.",
    );
  }
}

export async function delateProjectToEpicStory(epicStoryId, projectId) {
  try {
    // Trova il progetto con l'ID specificato
    const epicStory = await EpicStory.findById(epicStoryId);

    if (!epicStory) {
      console.error("Epic Story non trovata");
      return;
    }

    // Rimuovi l'utente dall'array degli utente del progetto
    epicStory.project = epicStory.project.filter(
      (project) => project.toString() !== projectId,
    );

    // Salva le modifiche
    await epicStory.save();

    console.log("Progetto rimosso con successo dall'epic story:", epicStory);
  } catch (error) {
    console.error(
      "Errore durante la rimozione del progetto dall'epic story:",
      error,
    );
  }
}

export async function addUserStoryToEpicStory(epicStoryId, userStoryId) {
  // Trova l'utente con l'ID specificato
  const epicStory = await EpicStory.findById(epicStoryId);
  if (!epicStory) {
    console.error("Epic Story non trovata");
    return;
  }
  if (UserStory.checkIfUserStoryExists(userStoryId)) {
    // Aggiungi il progetto all'array dei progetti dell'utente
    epicStory.userStory.push(userStoryId);
    //popolate('project').exe() per popolare un progetto ed usare i suoi campi
    await epicStory.save();
    console.log("User story aggiunto con successo all'epic story:", epicStory);
  } else {
    console.error(
      "L'user story specificato non esiste nel database o si è verificato un errore durante la ricerca.",
    );
  }
}

export async function delateUserStoryToEpicStory(epicStoryId, userStoryId) {
  try {
    // Trova il progetto con l'ID specificato
    const epicStory = await EpicStory.findById(epicStoryId);

    if (!epicStory) {
      console.error("Epic Story non trovato");
      return;
    }

    // Rimuovi l'utente dall'array degli utente del progetto
    epicStory.userStory = epicStory.userStory.filter(
      (userStory) => userStory.toString() !== userStoryId,
    );

    // Salva le modifiche
    await epicStory.save();

    console.log(
      "L'user story e' stata rimossa con successo dall'epic story:",
      epicStory,
    );
  } catch (error) {
    console.error(
      "Errore durante la rimozione dell'user story dall'epic story:",
      error,
    );
  }
}
