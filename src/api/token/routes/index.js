const router = require("express").Router();
const { create, update, readAll, readOne, remove } = require("./../controllers");


// CRUD implemented, but commented because for this exercice we only need to post an email and get back a token

// CREATE NEW
router.route("/").post(create);

// // GET ALL
// router.route("/").get(readAll);
// // GET ONE
// router.route("/:id").get(readOne);
// // UPDATE ONE
// router.route("/:id").put(update);
// // DELETE ONE
// router.route("/:id").delete(remove);

module.exports = router;
