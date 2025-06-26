// models/AuditLog.js
const mongoose = require("mongoose");
module.exports = mongoose.model("AuditLog", new mongoose.Schema({
  user : { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  action: String,
  details: Object,
  timestamp: { type: Date, default: Date.now }
}));
const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  action: String,
  details: Object,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("AuditLog", auditLogSchema);
const { auditLogger } = require("./middleware/authMiddleware");
app.use(auditLogger);
const router = require("express").Router();
const AuditLog = require("../models/AuditLog");
const { verifyToken, authorizeRoles } = require("../middleware/authMiddleware");

router.get("/", verifyToken, authorizeRoles("Admin"), async (req, res) => {
  const logs = await AuditLog.find().populate("user", "name role").sort({ timestamp: -1 });
  res.json(logs);
});

module.exports = router;
app.use("/api/audit-logs", require("./routes/audit"));
