const connection = require("../../config/db");

const getClienti = (req, res) => {

  console.log("Utente autenticato:", req.user);
  const studioId = req.user?.id_studio;

  if (!studioId) {
    return res.status(401).json({ error: "Non autorizzato" });
  }

  sql = "SELECT * FROM clienti WHERE id_studio = ?",


    connection.query(sql, [studioId], (err, results) => {

      if (err) {
        console.error("Errore durante la query:", err);
        return res.status(500).json({ error: "Errore nel recupero dei clienti" });
      }

      console.log("Clienti trovati:", results);
      res.json(results);
    }
    );
};

module.exports = { getClienti };