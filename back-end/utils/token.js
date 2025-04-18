const jwt = require("jsonwebtoken") // Importa la libreria jsonwebtoken per la gestione dei token JWT.


// Funzione per generare un token JWT per un utente.
const generaTokenUtente = (id) => { // Accetta un ID utente come input e restituisce un token firmato.
    return jwt.sign( {id}, process.env.JWT_SECRET, { // Il token include l'ID utente come payload e utilizza una chiave segreta definita in `process.env.JWT_SECRET`.
        expiresIn: "30d", // Il token ha una durata di 7 giorni.
       } )
}

module.exports = {
    generaTokenUtente
}