const connection = require("../../config/db");

const deleteClient = async (req, res) => {
  try {
    const studioId = req.user.id_studio;
    const clienteId = parseInt(req.params.id);

    // Validazione ID studio
    if (!studioId) {
      return res.status(400).json({ error: "Non hai i permessi per fare questa operazione" });
    }

    // Validazione ID cliente
    if (!clienteId) {
      return res.status(400).json({ error: "ID cliente non valido" });
    }

    // Verifica se il cliente esiste e appartiene allo studio
    const [result] = await connection.query(
      "SELECT * FROM clienti WHERE id = ? AND id_studio = ?",
      [clienteId, studioId]
    );

    const cliente = result[0];

    if (!cliente) {
      return res.status(404).json({ error: "Cliente non trovato" });
    }

    // Elimina il cliente
    await connection.query(
      "DELETE FROM clienti WHERE id = ? AND id_studio = ?",
      [clienteId, studioId]
    );

    res.status(200).json({
      message: "Cliente eliminato con successo",
      cliente,
    });

  } catch (err) {
    console.error("Errore durante eliminazione cliente:", err);
    res.status(500).json({ error: "Errore del server" });
  }
};

module.exports = { deleteClient };
