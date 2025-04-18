const prisma = require("../prisma/client");
const { confrontaPassword } = require("../utils/hash");
const { generaTokenUtente } = require("../utils/token")

const loginStudio = async (req, res) => {

    try {
        const { email, password } = req.body
        
        // Trova lo studio con l'email fornita
        const studio = await prisma.studio.findUnique({
            where: { email }
        })

        if (!studio) {
            return res.status(400).json({ error: "Email o Password errata" })
        }

        //confronta la password data con quella presente
        const passwordValida = await confrontaPassword(password, studio.password)

        // verifica se sono uguali
        if (!passwordValida) {
            return res.status(400).json({ error: "Email o Password errata" })
        }

        //Genera token
        const token = generaTokenUtente(studio.id)

        res.json({
            id: studio.id,
            nome: studio.nome,
            email: studio.email,
            token,
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "Errore del server" })
    }

}

module.exports = { loginStudio };