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
