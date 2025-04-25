const connection = require("../../../config/db")

const patchAppuntamento = (req, res) => {

    const studioId = req.user?.id_studio;

    if (!studioId) {
        return res.status(401).json({ error: "Non hai i permessi per accedere a questa risorsa" })

    }

    const { id } = req.params

    if (!id) {
        return res.status(400).json({ error: "ID appuntamento mancante" })
    }

    const { stato } = req.body

    // Validazione del valore di "stato"
    const statiValidi = ["COMPLETATO", "ANNULLATO", "IN_CORSO"];
    if (!statiValidi.includes(stato)) {
        return res.status(400).json({ error: `Stato non valido. Valori accettati: ${statiValidi.join(", ")}` });
    }

    const sql = `UPDATE appuntamenti SET stato = ? WHERE id = ? AND studioId = ?`

    connection.query(sql, [stato, id, studioId], (result, err) => {
        if (err) {
            console.error("Error updating appointment:", err)
            return res.status(500).json({ error: "Internal server error" })
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Appointment not found" })
        }

        res.status(200).json({
            message: "Appuntamento aggiornato con successo",
            stato,
        });
    })
}

module.exports = { patchAppuntamento }