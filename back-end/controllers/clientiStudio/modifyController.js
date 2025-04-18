const prisma = require("../../prisma/client");

const modifyClient = async (req, res) => {
    try {

        const studioId = req.user.id

        //Validazione studioId
        if (!studioId) {
            return res.status(400).json({ error: "Non hai i permessi per fare questa operazione" })
        }

        const clienteId = req.params.id

        const { nome, telefono } = req.body

        console.log(nome, telefono)

        // Validazione dei campi
        if (!nome || !telefono) {
            return res.status(400).json({ error: "Nome o telefono mancanti" });
        }

        if (!clienteId) {
            return res.status(400).json({ error: "ID cliente mancante" });
        }

        // Verifica se il cliente esiste
        const cliente = await prisma.cliente.findFirst({
            where: {
                id: parseInt(clienteId),
                studioId: studioId
            }
        });

        if (!cliente) {
            return res.status(403).json({ error: "Accesso negato. Cliente non valido per questo studio." });
        }

        const clienteModificato = await prisma.cliente.update({
            where: { id: parseInt(clienteId) },
            data: {
                nome: nome,
                telefono: telefono
            }
        });


        console.log("Cliente trovato:", clienteModificato)

        // Risposta di successo
        res.status(200).json({
            message: "Modifiche fatte",
            clienteModificato
        })

    } catch (err) {
        console.log(`Errore : ${err}`)
        res.status(500).json({ errror: "Errore del server" })
    }
}

module.exports = { modifyClient }