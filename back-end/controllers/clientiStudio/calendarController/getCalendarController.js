const connection = require("../../../config/db");


const getCalendar = (req, res) => {

    const studioId = req.user?.id_studio;
    console.log("Utente autenticato:", req.user);

    if (!studioId) {
        return res.status(401).json({ error: "Non autorizzato" });
    }

    const sql = `
        SELECT a.*, c.nome AS cliente_nome
        FROM appuntamenti a
        LEFT JOIN clienti c ON a.id_cliente = c.id
        WHERE a.id_studio = ?
    `;

    connection.query(sql, [studioId], (err, results) => {
      
        if (err) {
            console.error("Errore durante la query:", err);
            return res.status(500).json({ error: "Errore nel recupero degli appuntamenti" });
        }

        console.log("Appuntamenti trovati:", results);
        res.json(results);

    })

}

module.exports = { getCalendar}