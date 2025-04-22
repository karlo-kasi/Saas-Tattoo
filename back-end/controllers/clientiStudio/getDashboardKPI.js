const connection = require("../../config/db");

const getDashboardKPI = async (req, res) => {
  try {
    const { range } = req.query;
    const studioId = req.user.id_studio;

    let fromDate = null;
    if (range !== "all") {
      const giorni = parseInt(range.replace("d", ""));
      fromDate = new Date();
      fromDate.setHours(0, 0, 0, 0);
      fromDate.setDate(fromDate.getDate() - giorni);
    }

    // QUERY: Appuntamenti completati
    const [appuntamenti] = await connection.query(
      `
      SELECT a.id, p.importo
      FROM appuntamenti a
      JOIN pagamenti_cliente p ON a.id = p.id_appuntamento
      WHERE a.id_studio = ?
        AND p.stato_pagamento = 'completato'
        ${fromDate ? "AND a.data_appuntamento >= ?" : ""}
      `,
      fromDate ? [studioId, fromDate] : [studioId]
    );

    const numeroAppuntamenti = appuntamenti.length;

    const totaleFatturato = appuntamenti.reduce(
      (acc, app) => acc + (app.importo || 0),
      0
    );

    const spesaMedia =
      numeroAppuntamenti > 0 ? totaleFatturato / numeroAppuntamenti : 0;

    // QUERY: Clienti creati nel periodo
    const [clientiResult] = await connection.query(
      `
      SELECT COUNT(*) AS totale
      FROM clienti
      WHERE id_studio = ?
      ${fromDate ? "AND data_registrazione >= ?" : ""}
      `,
      fromDate ? [studioId, fromDate] : [studioId]
    );

    const clientiNuovi = clientiResult[0].totale;

    res.json({
      fatturatoTotale: totaleFatturato,
      appuntamentiCompletati: numeroAppuntamenti,
      spesaMedia: parseFloat(spesaMedia.toFixed(2)),
      clientiNuovi,
    });
  } catch (error) {
    console.error("Errore nel recupero dei KPI:", error);
    res.status(500).json({ error: "Errore nel recupero dei KPI" });
  }
};

module.exports = { getDashboardKPI };
