const {
  register,
  login,
  registrationCheck,
  logout,
  adminGetAllUsers,
  deleteUser,
  getUser,
  adminSearchUser,
  freezeAccount,
  changePassword,
} = require("../controllers/admin.controller");
const { adminProtection } = require("../middlewares/adminProtection");

const router = require("express").Router();

router.get("/registration-check", registrationCheck);
router.get("/get-single-user/:username", adminProtection, getUser);
router.get("/all-users", adminProtection, adminGetAllUsers);
router.get("/admin-search-user/:key", adminProtection, adminSearchUser);
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.put("/freeze-account/:id", adminProtection, freezeAccount);
router.put("/change-password", adminProtection, changePassword);
router.delete("/delete-user/:id", adminProtection, deleteUser);

module.exports = router;
