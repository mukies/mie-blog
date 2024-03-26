const { register } = require("../controllers/admin.controller");

const router = require("express").Router();

router.post("/register", register);

module.exports = router;
