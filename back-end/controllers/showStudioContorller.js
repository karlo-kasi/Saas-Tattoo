
const connection = require("../config/db");

const showStudio = async (req, res) => {
  try {
    const studioId = req.user.id_studio; // <-- attenzione: è l'id dello studio, non dell'utente!
    console.log("Studio ID:", studioId);

    const [rows] = await connection.query(
      "SELECT id, nome, email_admin AS email, telefono FROM studi WHERE id = ?",
      [studioId]
    );

    const studio = rows[0];

    if (!studio) {
      return res.status(404).json({ error: "Studio non trovato" });
    }

    res.json(studio);
  } catch (err) {
    console.error("Errore durante il recupero dello studio:", err);
    res.status(500).json({ error: "Errore del server" });
  }
};

module.exports = { showStudio };
