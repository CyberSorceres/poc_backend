const mongoose = require("mongoose");

const User = require("../schema/userSchema");
const Project = require("./project");
const UserStory = require("./userStory");

async function createUser(userData) {
  try {
    // Crea una nuova istanza del modello User con i dati forniti
    const newUser = new User(userData);

    // Salva il nuovo utente nel database
    await newUser.save();

    console.log("User created successfully:", newUser);
    return newUser;
  } catch (error) {
    console.error("Error creating user:", error.message);
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

function findUserByID(userId) {
  const user = User.findById(userId);

  if (!user) {
    console.error("Utente non trovato");
    return;
  }
  return user;
}

async function delateUser(idUser) {
  try {
    // Trova l'utente con l'ID specificato e elimina il documento
    const result = await User.deleteOne({ _id: idUser });

    if (result.deletedCount === 1) {
      console.log("Utente cancellato con successo");
    } else {
      console.error("Nessun utente trovato con l'ID specificato");
    }
  } catch (error) {
    console.error("Errore durante la cancellazione dell'utente:", error);
  }
}

async function delateFirstUser() {
  const utente = await User.findOne();
  console.log(utente._id);
  await delateUser(utente._id);
}

function updateNameUser(idUser, newNameUser) {
  User.updateOne({ _id: idUser }, { name: newNameUser }, (err, result) => {
    if (err) {
      console.error(
        "Errore durante la modifica del nome dell'utente:" + this._id,
        err,
      );
    } else {
      console.log("Nome modificato con successo:", result);
    }
  });
}

function updateEmailUser(idUser, newEmailUser) {
  User.updateOne({ _id: idUser }, { mail: newEmailUser }, (err, result) => {
    if (err) {
      console.error(
        "Errore durante la modifica della mail dell'utente:" + this._id,
        err,
      );
    } else {
      console.log("Mail modificata con successo:", result);
    }
  });
}

function updatPasswordUser(idUser, newPasswordUser) {
  User.updateOne(
    { _id: idUser },
    { password: newPasswordUser },
    (err, result) => {
      if (err) {
        console.error(
          "Errore durante la modifica della password dell'utente:" + this._id,
          err,
        );
      } else {
        console.log("Password modificato con successo:", result);
      }
    },
  );
}

function updatRoleUser(idUser, newRoleUser) {
  User.updateOne({ _id: idUser }, { role: newRoleUser }, (err, result) => {
    if (err) {
      console.error(
        "Errore durante la modifica del ruolo dell'utente:" + this._id,
        err,
      );
    } else {
      console.log("Ruolo modificato con successo:", result);
    }
  });
}

async function checkIfUserExists(userId) {
  try {
    // Cerca un progetto con l'ID specificato nel database
    const user = await User.findById(userId);

    if (user) {
      console.log("L'utente esiste nel database:", userId);
      return true;
    } else {
      console.log("L'utente non esiste nel database");
      return false;
    }
  } catch (error) {
    console.error(
      "Errore durante la verifica dell'esistenza del'utente:",
      error,
    );
    return false;
  }
}

//Dovrei aggiungere automaticamento anche le user story, posso usare popolate?

async function addProjectToUser(userId, projectId) {
  // Trova l'utente con l'ID specificato
  const user = await User.findById(userId);
  if (!user) {
    console.error("Utente non trovato");
    return;
  }
  if (Project.checkIfProjectExists(projectId)) {
    // Aggiungi il progetto all'array dei progetti dell'utente

    user.project.push(projectId);
    //popolate('project').exe() per popolare un progetto ed usare i suoi campi
    await user.save();
    console.log("Progetto aggiunto con successo all'utente:", user);
  } else {
    console.error(
      "Il progetto specificato non esiste nel database o si è verificato un errore durante la ricerca.",
    );
  }
}

async function addUserStoryToUser(userId, userStoryId) {
  // Trova l'utente con l'ID specificato
  const user = await User.findById(userId);
  if (!user) {
    console.error("Utente non trovato");
    return;
  }
  if (UserStory.checkIfUserStoryExists(userStoryId)) {
    // Aggiungi il progetto all'array dei progetti dell'utente

    user.userStory.push(userStoryId);
    //popolate('project').exe() per popolare un progetto ed usare i suoi campi
    await user.save();
    console.log("Progetto aggiunto con successo all'utente:", user);
  } else {
    console.error(
      "Il progetto specificato non esiste nel database o si è verificato un errore durante la ricerca.",
    );
  }
}

async function delateProjectToUser(userId, projectId) {
  try {
    // Trova l'utente con l'ID specificato
    const user = await User.findById(userId);

    if (!user) {
      console.error("Utente non trovato");
      return;
    }

    // Rimuovi il progetto dall'array dei progetti dell'utente
    user.project = user.project.filter(
      (project) => project.toString() !== projectId,
    );

    // Salva le modifiche all'utente
    await user.save();

    console.log("Progetto rimosso con successo dall'utente:", user);
  } catch (error) {
    console.error(
      "Errore durante la rimozione del progetto dall'utente:",
      error,
    );
  }
}

async function delateUserStoryToUser(userId, userStoryId) {
  try {
    // Trova l'utente con l'ID specificato
    const user = await User.findById(userId);

    if (!user) {
      console.error("Utente non trovato");
      return;
    }

    // Rimuovi il progetto dall'array dei progetti dell'utente
    user.userStory = user.userStory.filter(
      (userStory) => userStory.toString() !== userStoryId,
    );

    // Salva le modifiche all'utente
    await user.save();

    console.log("Progetto rimosso con successo dall'utente:", user);
  } catch (error) {
    console.error(
      "Errore durante la rimozione del progetto dall'utente:",
      error,
    );
  }
}

module.exports = {
  createUser,
  delateUser,
  delateFirstUser,
  updateNameUser,
  updatPasswordUser,
  updateEmailUser,
  updatRoleUser,
  addProjectToUser,
  delateProjectToUser,
  checkIfUserExists,
  delateUserStoryToUser,
  addUserStoryToUser,
};
