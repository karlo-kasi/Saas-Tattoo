const connection = require("../../../config/db")

const deleteAppuntamento = (req, res) => {
    const studioId = req.user?.id_studio;

    if (!studioId) {
        return res.status(401).json({ error: "Non hai i permessi per accedere a questa risorsa" })

    }

    const { id } = req.params

    if (!id) {
        return res.status(400).json({ error: "ID appuntamento mancante" })
    }

    const sql = `DELETE FROM appuntamenti WHERE id = ? AND id_studio = ?`

    connection.query(sql, [id, studioId], (err, result) => {
        if (err) {
            console.error("Error deleting appointment:", err)
            return res.status(500).json({ error: "Internal server error" })
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Appointment non trovato" })
        }

        res.status(200).json({
            message: "Appuntamento eliminato con successo",
        });
    })

}

module.exports = { deleteAppuntamento }