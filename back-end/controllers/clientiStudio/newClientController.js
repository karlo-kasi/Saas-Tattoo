const prisma = require("../../prisma/client");

const newClient = async (req, res) => {
    try {
        console.log("Utente autenticato:", req.user); // Log per verificare req.user
        const studioId = req.user.id

        console.log("Studio ID:", studioId); // Log per verificare studioId

        const { nome, telefono } = req.body;

        // Controlla che i campi siano presenti
        if (!nome || !telefono) {
            return res.status(400).json({ error: 'Nome e telefono sono obbligatori' });
        }

        // Validazione dei dati
        if (nome.length < 3 || telefono.length > 10) {
            return res.status(400).json({ error: 'Dati non validi' });
        }
        
        // Validazione telefono solo numeri
        if (!/^\d+$/.test(telefono)) {
            return res.status(400).json({ error: 'Il numero di telefono deve contenere solo cifre' });
        }

        // Crea il nuovo cliente
        const cliente = await prisma.cliente.create({
            data: {
                studioId,
                nome,
                telefono
            },
        })

        console.log("Clienti trovati:", cliente); // Log per verificare i risultati

        res.status(201).json({
            message: "Cliente creato con successo",
            cliente,
        });

    } catch (err) {
        console.error("Problemi con il server:", err.message);
        res.status(500).json({ error: "Errore del server" });
    }
}

module.exports = { newClient };