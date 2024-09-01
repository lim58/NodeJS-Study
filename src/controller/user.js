const express = require("express")
const router = express.Router()
const logic = require("../service/user")

router.get("/userInfo", logic.userInfo)
router.put("/modifyProfile", logic.modifyProfile)

module.exports = router