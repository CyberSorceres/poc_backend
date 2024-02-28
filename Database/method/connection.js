const mongoose = require("mongoose");
require("dotenv").config();

const dbURI =
  "mongodb+srv://cybersorcerers23:" +
  process.env.PASSWORD_DB +
  "@cybersorcerersdb.oletifm.mongodb.net/cybersorcerersDB?retryWrites=true&w=majority";

function connect() {
  mongoose
    .connect(dbURI)
    .then(() => {
      console.log("Connesso");
    })
    .catch((error) => {
      console.error("Errore durante la connessione", error);
    });
}

function disconnect() {
  try {
    if (mongoose.connection.readyState === 1) {
      mongoose.disconnect();
      console.log("Disconnesso ");
    } else {
      console.log("Non sei connesso al database");
    }
  } catch (error) {
    console.error("Errore durante la disconnessione:", error);
  }
}

module.exports = { connect, disconnect };
