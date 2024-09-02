const router = require("express")()
const logic = require("../service/user")

router.get("/userInfo", logic.userInfo)
router.put("/modifyProfile", logic.modifyProfile)

module.exports = router