const prisma = require("../../prisma/client");

const getDashboardKPI = async (req, res) => {
    try {
        console.log("Controller getDashboardKPI chiamato");
        const { range } = req.query;
        console.log("Range ricevuto:", range);

        const studioId = req.user.studioId;

        let dateFilter = {};
        if (range !== 'all') {
            const giorni = parseInt(range.replace('d', '')); // es: "30d" => 30
            const fromDate = new Date();
            fromDate.setDate(fromDate.getDate() - giorni);
            dateFilter = { gte: fromDate };
        }

        // Appuntamenti completati nel range
        const appuntamentiCompletati = await prisma.appuntamento.findMany({
            where: {
                stato: 'COMPLETATO',
                studioId: studioId,
                data: dateFilter,
            },
            include: {
                pagamento: true,
            },
        });

        console.log("Appuntamenti completati:", appuntamentiCompletati);

        // Calcolo KPI
        const numeroAppuntamenti = appuntamentiCompletati.length;
        console.log("Numero appuntamenti completati:", numeroAppuntamenti);


        const totaleFatturato = appuntamentiCompletati.reduce((acc, app) => {
            return acc + (app.pagamento?.importo || 0);
        }, 0);
        console.log("Totale fatturato:", totaleFatturato);

        const spesaMedia =
            numeroAppuntamenti > 0
                ? totaleFatturato / numeroAppuntamenti
                : 0;
        console.log("Spesa media:", spesaMedia);

        // Clienti creati nel range
        const clientiNuovi = await prisma.cliente.count({
            where: {
                studioId: studioId,
                ...(range !== 'all' && {
                    createdAt: dateFilter,
                }),
            },
        });

        // Risposta
        res.json({
            fatturatoTotale: totaleFatturato,
            appuntamentiCompletati: numeroAppuntamenti,
            spesaMedia: parseFloat(spesaMedia.toFixed(2)),
            clientiNuovi,
        });

    } catch (error) {
        console.error('Errore nel recupero dei KPI:', error);
        res.status(500).json({ error: 'Errore nel recupero dei KPI' });
    }
};

module.exports = { getDashboardKPI }