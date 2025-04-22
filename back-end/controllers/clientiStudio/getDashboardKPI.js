const prisma = require("../../prisma/client");

const getDashboardKPI = async (req, res) => {
    try {
        const { range } = req.query;
        console.log("Range ricevuto:", range);

        const studioId = req.user.studioId;
        console.log("Studio ID:", studioId);

        let fromDate = null;
        if (range !== 'all') {
            const giorni = parseInt(range.replace('d', '')); // es: "30d" => 30
            fromDate = new Date();
            fromDate.setHours(0, 0, 0, 0); // resetta l'orario a mezzanotte
            fromDate.setDate(fromDate.getDate() - giorni);
            console.log("Filtro data (fromDate):", fromDate);
        } else {
            console.log("Nessun filtro temporale applicato (range = all)");
        }

        // Appuntamenti completati nel range
        const appuntamentiCompletati = await prisma.appuntamento.findMany({
            where: {
                stato: 'COMPLETATO',
                studioId: studioId,
                ...(fromDate && {
                    data: {
                        gte: fromDate,
                    },
                }),
            },
            include: {
                pagamento: true,
            },
        });
        console.log("Appuntamenti completati trovati:", appuntamentiCompletati);


        const numeroAppuntamenti = appuntamentiCompletati.length;
        console.log("Numero di appuntamenti completati:", numeroAppuntamenti);

        const totaleFatturato = appuntamentiCompletati.reduce((acc, app) => {
            return acc + (app.pagamento?.importo || 0);
        }, 0);
        console.log("Totale fatturato:", totaleFatturato);

        const spesaMedia = numeroAppuntamenti > 0
            ? totaleFatturato / numeroAppuntamenti
            : 0;
        console.log("Spesa media per appuntamento:", spesaMedia);

        // Clienti creati nel range
        const clientiNuovi = await prisma.cliente.count({
            where: {
                studioId: studioId,
                ...(fromDate && {
                    createdAt: {
                        gte: fromDate,
                    },
                }),
            },
        });
        console.log("Numero di nuovi clienti creati:", clientiNuovi);

        res.json({
            fatturatoTotale: totaleFatturato,
            appuntamentiCompletati: numeroAppuntamenti,
            spesaMedia: parseFloat(spesaMedia.toFixed(2)),
            clientiNuovi,
        });
        console.log("Risposta inviata con successo");

    } catch (error) {
        console.error('Errore nel recupero dei KPI:', error);
        res.status(500).json({ error: 'Errore nel recupero dei KPI' });
    }
};

module.exports = { getDashboardKPI };