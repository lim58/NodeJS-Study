const router = require("express")()
const logic = require("../service/find")

router.patch = require("/findId", logic.findId)
router.patch = require("/findPassword", logic.findPassword)

module.exports = router