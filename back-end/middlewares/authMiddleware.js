const jwt = require("jsonwebtoken")

const verificaToken = (req, res, next) => {
   const authHeader = req.headers.authorization

   if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Token mancante o non valido" })
   }
   
   const token = authHeader.split(" ")[1];

   try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = decoded // Puoi aggiungere i dati decodificati alla richiesta
      console.log("TOKEN DECODIFICATO dal MIDDLEWARE:", decoded);
      next(); // Passa al middleware successivo
   } catch (err) {
      return res.status(403).json({ error: "Token non valido" })
   }


}

module.exports = { verificaToken }