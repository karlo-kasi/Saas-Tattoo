const connection = require("../../config/db");

const getClienti = async (req, res) => {
  try {
    console.log("Utente autenticato:", req.user);
    const studioId = req.user.id_studio;

    console.log("Studio ID:", studioId);

    const [clienti] = await connection.query(
      "SELECT * FROM clienti WHERE id_studio = ?",
      [studioId]
    );

    console.log("Clienti trovati:", clienti);
    res.json(clienti);
  } catch (err) {
    console.error("Errore dettagliato:", err.message, err.stack);
    res.status(500).json({ error: "Errore nel recupero dei clienti" });
  }
};

module.exports = { getClienti };