const connection = require("../../config/db");

const getDashboardKPI = (req, res) => {
  const studioId = req.user.id_studio;
  console.log("Studio ID:", studioId);
  const range = req.query.range || 'all';
  console.log("Range:", range);

  let sql = `
    SELECT SUM(importo) AS fatturato_totale
    FROM pagamenti_cliente
    WHERE id_studio = ? 
  `;
  const values = [studioId];

  if (range !== 'all') {
    const giorni = parseInt(range.replace('d', ''), 10); // Parsing del numero di giorni
    if (!isNaN(giorni) && giorni > 0) {
      sql += ` AND data_pagamento >= DATE_SUB(NOW(), INTERVAL ? DAY)`;
      values.push(giorni);
    } else {
      console.error("Range non valido:", range);
      return res.status(400).json({ error: "Range non valido" });
    }
  }

  console.log("SQL Query:", sql);
  console.log("Valori:", values);

  connection.query(sql, values, (err, results) => {
    if (err) {
      console.error("Errore DB:", err);
      return res.status(500).json({ error: "Errore nel recupero del fatturato" });
    }

    res.json({
      fatturatoTotale: results[0]?.fatturato_totale || 0
    });
  });

  console.log("Query eseguita con successo");
  
};

module.exports = {
  getDashboardKPI
};