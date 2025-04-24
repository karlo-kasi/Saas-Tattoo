const connection = require("../../../config/db");

const detailsAppuntament = (req, res) => {
    
    const studioId = req.user?.id_studio;
    
    if(!studioId){
        return res.status(401).json({ error: "Non hai i permessi per accedere a questa risorsa" });
    }

    const idAppuntamento = req.params.id;

    if(!idAppuntamento){
        return res.status(400).json({ error: "ID appuntamento mancante" });
    }

    const sql = `SELECT * FROM appuntamenti WHERE id = ? AND id_studio = ?`;

    connection.query(sql, [idAppuntamento, studioId], (err, results) => {
        if (err) {
            console.error("Errore durante la query:", err);
            return res.status(500).json({ error: "Errore nel recupero dell'appuntamento" });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: "Appuntamento non trovato" });
        }

        console.log("Appuntamento trovato:", results[0]);
        res.json(results[0]);
    })



}

module.exports = {detailsAppuntament};