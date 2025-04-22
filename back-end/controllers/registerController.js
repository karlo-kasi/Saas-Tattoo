const connection = require("../config/db"); // Importa la connessione al database
const { criptaPassword } = require("../utils/hash");
const { generaTokenUtente } = require("../utils/token");

const registerStudio = async (req, res) => {
  try {
    const { nome, email_admin, password, indirizzo, telefono } = req.body;

    console.log("Dati ricevuti:", req.body);

    // Verifica che tutti i dati siano stati forniti
    if (!nome || !email_admin || !password || !indirizzo || !telefono) {
      return res.status(400).json({ error: "Tutti i campi sono obbligatori" });
    }

    // Verifica se lo studio esiste già
    const verificaQuery = `SELECT id FROM studi WHERE email_admin = ?`;
    connection.query(verificaQuery, [email_admin], async (err, results) => {
      if (err) {
        console.error("Errore durante la verifica dello studio:", err);
        return res.status(500).json({ error: "Errore del server" });
      }

      if (results.length > 0) {
        return res.status(400).json({ error: "Email già registrata" });
      }

      // Cripta la password
      const passwordCriptata = await criptaPassword(password);

      // Crea lo studio e l'utente admin
      const creaStudioQuery = `
        INSERT INTO studi (nome, email_admin, indirizzo, telefono) VALUES (?, ?, ?, ?)
      `;
      connection.query(
        creaStudioQuery,
        [nome, email_admin, indirizzo, telefono],
        (err, result) => {
          if (err) {
            console.error("Errore durante la creazione dello studio:", err);
            return res.status(500).json({ error: "Errore del server" });
          }

          const studioId = result.insertId;

          // Crea l'utente admin associato allo studio
          const creaUtenteQuery = `
            INSERT INTO utenti (nome, email, password_hash, ruolo, id_studio) VALUES (?, ?, ?, ?, ?)
          `;
          connection.query(
            creaUtenteQuery,
            ["Admin", email_admin, passwordCriptata, "ADMIN", studioId],
            (err) => {
              if (err) {
                console.error("Errore durante la creazione dell'utente admin:", err);
                return res.status(500).json({ error: "Errore del server" });
              }

              // Genera il token JWT
              const token = generaTokenUtente(studioId);

              // Risposta
              res.status(201).json({
                id: studioId,
                nome,
                email_admin,
                indirizzo,
                telefono,
                token,
              });
            }
          );
        }
      );
    });
  } catch (err) {
    console.error("Errore durante la registrazione dello studio:", err);
    res.status(500).json({ error: "Errore del server" });
  }
};

module.exports = { registerStudio };