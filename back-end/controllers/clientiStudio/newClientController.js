const connection = require("../../config/db");

const newClient = async (req, res) => {
  try {
    const studioId = req.user.id_studio;
    const { nome, telefono } = req.body;

    console.log("Utente autenticato:", req.user);
    console.log("Studio ID:", studioId);

    // Validazione input
    if (!nome || !telefono) {
      return res.status(400).json({ error: "Nome e telefono sono obbligatori" });
    }

    if (nome.length < 3 || telefono.length > 10) {
      return res.status(400).json({ error: "Dati non validi" });
    }

    if (!/^\d+$/.test(telefono)) {
      return res.status(400).json({ error: "Il numero di telefono deve contenere solo cifre" });
    }

    // Inserimento nuovo cliente
    const [result] = await connection.query(
      "INSERT INTO clienti (id_studio, nome, telefono, data_registrazione) VALUES (?, ?, ?, NOW())",
      [studioId, nome, telefono]
    );

    const cliente = {
      id: result.insertId,
      nome,
      telefono,
      id_studio: studioId
    };

    console.log("Cliente creato:", cliente);

    res.status(201).json({
      message: "Cliente creato con successo",
      cliente,
    });

  } catch (err) {
    console.error("Errore durante la creazione del cliente:", err.message);
    res.status(500).json({ error: "Errore del server" });
  }
};

module.exports = { newClient };
