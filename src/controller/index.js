const app = require("express")()
const auth = require("./auth")
const user = require("./user")

app.use("/auth", auth)
app.use("/user", user)

module.exports = app