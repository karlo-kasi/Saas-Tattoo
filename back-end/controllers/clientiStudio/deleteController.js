const prisma = require("../../prisma/client");

const deleteClient = async (req, res) => {

    try {

        const studioId = req.user.id

        //Validazione studioId
        if (!studioId) {
            return res.status(400).json({ error: "Non hai i permessi per fare questa operazione" })
        }

        const clienteId = req.params.id

        // Validazione id
        if (!parseInt(clienteId)) {
            return res.status(400).json({ error: "ID non trovato" });
        }

        // Verifica se il cliente esiste
        const cliente = await prisma.cliente.findFirst({
            where: {
                id: parseInt(clienteId),
                studioId: studioId
            }
        });

        if (!cliente) {
            return res.status(404).json({ error: "Cliente non trovato" });
        }

        // Eliminazione del cliente
        const clienteEliminato = await prisma.cliente.delete({
            where: { id: parseInt(clienteId) }
        })


        //risposta di eliminazione andata con sucesso
        res.status(200).json({
            message: "Cliente eliminato con successo",
            cliente: clienteEliminato,
        });

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Errore del server" })
    }
}

module.exports = { deleteClient }