const express = require("express")
const app = express()
const PORT = 3000
const HOST = require("ip").address()
const DOMAIN = "http://" + HOST + ":" + PORT + "/"

app.listen(PORT, HOST, function(err) {
    if (err) {
        console.log(err)
    } else {
        console.log(`Started listening on ${DOMAIN}`)
    }
})

app.use(express.static("public"))
app.use(express.json({ limit: "1mb" }))
