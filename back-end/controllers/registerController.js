const prisma = require("../prisma/client");
const { criptaPassword } = require("../utils/hash");
const { generaTokenUtente } = require("../utils/token");

const registerStudio = async (req, res) => {
  try {
    const { nome, email, password } = req.body;

    console.log("Dati ricevuti:", req.body);

    // Controlla se esiste già
    const studioEsistente = await prisma.studio.findUnique({
      where: { email },
    });

    if (studioEsistente) {
      return res.status(400).json({ error: "Email già registrata" });
    }

    // Cripta la password
    const passwordCriptata = await criptaPassword(password);

    // Crea lo studio
    const nuovoStudio = await prisma.studio.create({
      data: {
        nome,
        email,
        password: passwordCriptata,
      },
    });

    // Genera il token JWT
    const token = generaTokenUtente(nuovoStudio.id);

    // Risposta
    res.status(201).json({
      id: nuovoStudio.id,
      nome: nuovoStudio.nome,
      email: nuovoStudio.email,
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Errore del server" });
  }
};

module.exports = { registerStudio };