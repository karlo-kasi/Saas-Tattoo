const connection = require("../config/db"); // Importa la connessione al database
const { confrontaPassword } = require("../utils/hash");
const { generaTokenUtente } = require("../utils/token");

const loginStudio = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verifica che i dati siano stati forniti
    if (!email || !password) {
      return res.status(400).json({ error: "Email e Password sono obbligatori" });
    }

    // Query per trovare l'utente con l'email fornita
    const sql = `
      SELECT u.id, u.nome, u.email, u.password_hash, u.ruolo, 
             s.id AS studio_id, s.nome AS studio_nome, s.email_admin, s.indirizzo, s.telefono
      FROM utenti u
      JOIN studi s ON u.id_studio = s.id
      WHERE u.email = ?
    `;

    connection.query(sql, [email], async (err, results) => {
      if (err) {
        console.error("Errore durante la query:", err);
        return res.status(500).json({ error: "Errore del server" });
      }

      // Controlla se l'utente esiste
      const utente = results[0];
      if (!utente) {
        return res.status(400).json({ error: "Email o Password errata" });
      }

      // Confronta la password fornita con quella salvata nel database
      const passwordValida = await confrontaPassword(password, utente.password_hash);

      if (!passwordValida) {
        return res.status(400).json({ error: "Email o Password errata" });
      }

      // Genera un token JWT
      const token = generaTokenUtente(utente.id, utente.studio_id);

      // Risposta con i dettagli dell'utente e dello studio
      res.json({
        id: utente.id,
        nome: utente.nome,
        email: utente.email,
        ruolo: utente.ruolo,
        studio: {
          id: utente.studio_id,
          nome: utente.studio_nome,
          email_admin: utente.email_admin,
          indirizzo: utente.indirizzo,
          telefono: utente.telefono,
        },
        token,
      });
    });
  } catch (err) {
    console.error("Errore durante il login:", err);
    res.status(500).json({ error: "Errore del server" });
  }
};

module.exports = { loginStudio };