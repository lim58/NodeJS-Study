const express = require("express")()
const router = express.Router()
const logic = require("../service/auth")

router.post("/signup", logic.signup)
router.post("/login", logic.login)
router.get("/logout", logic.logout)
router.post("/cancelAccount", logic.cancelAccount)

module.exports = router