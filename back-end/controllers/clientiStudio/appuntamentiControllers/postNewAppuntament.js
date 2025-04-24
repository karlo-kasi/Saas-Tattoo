const connection = require('../../../config/db');

const postNewAppuntamento = (req, res) => {
    const studioId = req.user?.id_studio;
    console.log("Utente autenticato:", req.user);

    if (!studioId) {
        return res.status(401).json({ error: "Non autorizzato" });
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
            creaAppuntamento(clienteId);
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
                creaAppuntamento(clienteId);
            });
        }
    });

    // Funzione per creare l'appuntamento
    function creaAppuntamento(clienteId) {
        const creaAppuntamentoSQL = `
            INSERT INTO appuntamenti (data_appuntamento, durata_minuti, prezzo, acconto, codice_sconto, note, id_cliente, id_studio)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        connection.query(creaAppuntamentoSQL, [dataOraAppuntamento, durata_minuti, prezzo, acconto, codice_sconto, note, clienteId, studioId], (err, result) => {
            if (err) {
                console.error("Errore durante la creazione dell'appuntamento:", err);
                return res.status(500).json({ error: "Errore del server" });
            }

            console.log("Appuntamento creato con ID:", result.insertId);
            res.status(201).json({ message: "Appuntamento creato con successo", appuntamentoId: result.insertId });
        });
    }
};

module.exports = { postNewAppuntamento };