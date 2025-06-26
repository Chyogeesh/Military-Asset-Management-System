const router = require("express").Router();
const ctrl = require("../controllers/assetController");
const { verifyToken, authorizeRoles } = require("../middleware/authMiddleware");

router.use(verifyToken);

router.post("/", authorizeRoles("Admin", "Commander"), ctrl.createAsset);
router.get("/", ctrl.getAssets);
router.put("/:id", authorizeRoles("Admin", "Commander"), ctrl.updateAsset);
router.delete("/:id", authorizeRoles("Admin"), ctrl.deleteAsset);

module.exports = router;
