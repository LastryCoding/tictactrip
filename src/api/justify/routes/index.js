const router = require("express").Router();
const { justify } = require("./../controllers");

// JUSTIFY NEW
router.route("/").post(justify);

module.exports = router;
