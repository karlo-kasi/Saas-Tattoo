const express = require("express")
const cors = require("cors")
const routes = require("./routes/authRoute")

const app = express()

app.use(cors({
    origin: "http://localhost:5173"
}))
app.use(express.static("public"))
app.use(express.json())

app.use("/api/app", routes)


const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server avviato sulla porta ${port}`)
})
    