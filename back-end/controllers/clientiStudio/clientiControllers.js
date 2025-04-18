const prisma = require("../../prisma/client");

const getClienti = async (req, res) => {
    try {
        console.log("Utente autenticato:", req.user); // Log per verificare req.user
        const studioId = req.user.id;

        console.log("Studio ID:", studioId); // Log per verificare studioId
        const clienti = await prisma.cliente.findMany({
            where: { studioId }
        });

        console.log("Clienti trovati:", clienti); // Log per verificare i risultati
        res.json(clienti);
        
    } catch (err) {
        console.error("Errore dettagliato:", err.message, err.stack);
        res.status(500).json({ error: "Errore nel recupero dei clienti" });
    }
};

module.exports = { getClienti };