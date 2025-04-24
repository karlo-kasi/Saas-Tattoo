const { getFatturatoTotale, getSpesaMedia, getAppuntamentiCompletati } = require("./kpi");
const { getFatturatoMensile, getClientiPerMese } = require("./stats");

const kpiHandler = (req, res) => {
  const tipo = req.params.tipo;
  switch (tipo) {
    case "fatturato": return getFatturatoTotale(req, res);
    case "spesa-media": return getSpesaMedia(req, res);
    case "appuntamenti": return getAppuntamentiCompletati(req, res);
    default: return res.status(400).json({ error: "KPI non valido" });
  }
};

const graficoHandler = (req, res) => {
  const tipo = req.params.tipo;
  switch (tipo) {
    case "fatturato-mensile": return getFatturatoMensile(req, res);
    case "clienti-mensili": return getClientiPerMese(req, res);
    default: return res.status(400).json({ error: "Grafico non valido" });
  }
};

module.exports = { kpiHandler, graficoHandler };