const router = require("express")()
const logic = require("../service/auth")

router.post("/signup", logic.signup)
router.post("/login", logic.login)
router.post("/logout", logic.logout)
router.delete("/cancelAccount", logic.cancelAccount)

module.exports = router