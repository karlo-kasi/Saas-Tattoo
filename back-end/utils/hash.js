const bcrypt = require("bcrypt") // Importa la libreria bcrypt per la gestione delle password (hashing e confronto)

// Funzione per criptare una password.
const criptaPassword = (password) => { // Accetta una password come input e restituisce una versione hashata della password usando bcrypt.
   return bcrypt.hash( password, 10 )
}

// Funzione per confrontare una password con un hash
const confrontaPassword = (password, hash) => { // Accetta una password in chiaro e un hash, e verifica se corrispondono
   return bcrypt.compare(password, hash )
}

module.exports = {
    criptaPassword,
    confrontaPassword
}