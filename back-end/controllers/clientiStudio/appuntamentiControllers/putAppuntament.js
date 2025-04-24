const connection = require("../../../config/db");

const putAppuntamento = (req, res) => {


    const studioId = req.user?.id_studio;
    console.log("Utente autenticato:", req.user);

    if (!studioId){
        return res.status(401).json({ error: "Non autorizzato"})
    }

    const idAppuntamento = req.params.id;
    
    console.log("ID appuntamento:", idAppuntamento);

    // Verifica se l'ID appuntamento è fornito
    if (!idAppuntamento) {
        return res.status(400).json({ error: "ID appuntamento mancante" });
    }

    const { data_appuntamento, ora, id_cliente, nome_cliente, telefono_cliente, note, durata_minuti, prezzo, acconto, codice_sconto } = req.body;
    console.log("Dati ricevuti:", req.body);

    if (!data_appuntamento || !ora || !note) {
        return res.status(400).json({ error: "Dati mancanti" });
    }

    // Combina data e ora in un unico valore DATETIME
    const dataOraAppuntamento = `${data_appuntamento} ${ora}:00`; // Formato: YYYY-MM-DD HH:mm:ss
    console.log("Data e ora combinati:", dataOraAppuntamento);

    // Verifica se il cliente esiste
    const verificaClienteSQL = `SELECT id FROM clienti WHERE id = ? OR (nome = ? AND telefono = ?)`;
    connection.query(verificaClienteSQL, [id_cliente, nome_cliente, telefono_cliente], (err, results) => {
        if (err) {
            console.error("Errore durante la verifica del cliente:", err);
            return res.status(500).json({ error: "Errore del server" });
        }

        let clienteId = id_cliente;

        if (results.length > 0) {
            // Cliente esistente
            clienteId = results[0].id;
            console.log("Cliente esistente trovato:", clienteId);
            modificaAppuntamento(clienteId);
        } else {
            // Cliente non esistente, crealo
            const creaClienteSQL = `INSERT INTO clienti (nome, telefono, id_studio) VALUES (?, ?, ?)`;
            connection.query(creaClienteSQL, [nome_cliente, telefono_cliente, studioId], (err, result) => {
                if (err) {
                    console.error("Errore durante la creazione del cliente:", err);
                    return res.status(500).json({ error: "Errore del server" });
                }

                clienteId = result.insertId; // Ottieni l'id del cliente appena creato
                console.log("Nuovo cliente creato con ID:", clienteId);
                modificaAppuntamento(clienteId);
            });
        }
    });

    // Funzione per modificare l'appuntamento
    function modificaAppuntamento(clienteId) {
        const modificaAppuntamentoSQL = `
            UPDATE appuntamenti
            SET data_appuntamento = ?, durata_minuti = ?, prezzo = ?, acconto = ?, codice_sconto = ?, note = ?, id_cliente = ?
            WHERE id = ? AND id_studio = ?
        `;
        connection.query(modificaAppuntamentoSQL, [dataOraAppuntamento, durata_minuti, prezzo, acconto, codice_sconto, note, clienteId, idAppuntamento, studioId], (err, result) => {
            if (err) {
                console.error("Errore durante la modifica dell'appuntamento:", err);
                return res.status(500).json({ error: "Errore del server" });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: "Appuntamento non trovato o non autorizzato" });
            }

            console.log("Appuntamento modificato con successo:", result);
            return res.status(200).json({ message: "Appuntamento modificato con successo" });
        });
    }
}

module.exports = {putAppuntamento};