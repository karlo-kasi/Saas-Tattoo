
const connection = require("../../config/db");

const getMe = (req, res) => {

  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ error: "Utente non autenticato" });
  }

  sql = "SELECT id, nome, email, ruolo FROM utenti WHERE id = ?";


  connection.query(sql, [userId], (err, results) => {

    if (err) {
      console.error("Errore durante la query:", err);
      return res.status(500).json({ error: "Errore del server" });
    }

    const utente = results[0];
    if (!utente) {
      return res.status(404).json({ error: "Utente non trovato" });
    }

    res.status(200).json( utente);
  }
  );
};

module.exports = { getMe };
