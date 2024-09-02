const app = require("express")()
const auth = require("./auth.js")
const user = require("./user.js")

app.use("/auth", auth)
app.use("/user", user)

module.exports = app