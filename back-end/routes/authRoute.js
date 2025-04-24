const express = require("express");
const router = express.Router();
const { registerStudio } = require("../controllers/registerController");
const { loginStudio } = require("../controllers/loginController")
const { verificaToken } = require("../middlewares/authMiddleware")
const { getClienti } = require("../controllers/clientiStudio/clientiControllers")
const { newClient } = require("../controllers/clientiStudio/newClientController")
const { modifyClient } = require("../controllers/clientiStudio/modifyController")
const { deleteClient } = require("../controllers/clientiStudio/deleteController")
const { getMe } = require("../controllers/clientiStudio/showStudioContorller")
const { getDashboardKPI } = require("../controllers/clientiStudio/getDashboardKPI")
const { getCalendar } = require("../controllers/clientiStudio/calendarController/getCalendarController")


router.post("/register", registerStudio)

router.post("/login", loginStudio)




// rotte per i clienti dello studio

router.get("/user/", verificaToken, getMe)

router.get("/kpi", verificaToken, getDashboardKPI)

// rotta per il calendario

router.get("/calendar", verificaToken, getCalendar)

router.get("/clienti", verificaToken, getClienti)

router.post("/newclient", verificaToken, newClient)

router.put("/modifyclient/:id", verificaToken, modifyClient)

router.delete("/deleteclient/:id", verificaToken, deleteClient)


module.exports = router;