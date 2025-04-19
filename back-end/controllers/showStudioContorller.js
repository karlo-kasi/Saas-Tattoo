
const prisma = require("../prisma/client");

const showStudio = async (req, res) => {
  try {
    const studioId = req.user.id;

    const studio = await prisma.studio.findUnique({
      where: {
        id: studioId,
      },
      select: {
        id: true,
        nome: true,
        email: true,
      },
    });

    if (!studio) {
      return res.status(404).json({ error: "Studio non trovato" });
    }

    res.json(studio);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Errore del server" });
  }
};

module.exports = {showStudio};