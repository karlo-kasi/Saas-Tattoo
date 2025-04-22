const connection = require("../../config/db");

const modifyClient = async (req, res) => {
  try {
    const studioId = req.user.id_studio; // Assicurati che venga dal token JWT
    const clienteId = parseInt(req.params.id);
    const { nome, telefono } = req.body;

    // Validazioni
    if (!studioId) {
      return res.status(400).json({ error: "Non hai i permessi per fare questa operazione" });
    }

    if (!clienteId || !nome || !telefono) {
      return res.status(400).json({ error: "ID cliente, nome o telefono mancanti" });
    }

    // Verifica che il cliente appartenga a questo studio
    const [result] = await connection.query(
      "SELECT * FROM clienti WHERE id = ? AND id_studio = ?",
      [clienteId, studioId]
    );

    const cliente = result[0];

    if (!cliente) {
      return res.status(403).json({ error: "Accesso negato. Cliente non trovato o non valido per questo studio." });
    }

    // Modifica cliente
    await connection.query(
      "UPDATE clienti SET nome = ?, telefono = ? WHERE id = ? AND id_studio = ?",
      [nome, telefono, clienteId, studioId]
    );

    const clienteModificato = {
      id: clienteId,
      nome,
      telefono,
    };

    console.log("Cliente aggiornato:", clienteModificato);

    // Risposta
    res.status(200).json({
      message: "Modifiche fatte",
      cliente: clienteModificato,
    });

  } catch (err) {
    console.error("Errore durante la modifica del cliente:", err);
    res.status(500).json({ error: "Errore del server" });
  }
};

module.exports = { modifyClient };
