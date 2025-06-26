// models/AuditLog.js
const mongoose = require("mongoose");
module.exports = mongoose.model("AuditLog", new mongoose.Schema({
  user : { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  action: String,
  details: Object,
  timestamp: { type: Date, default: Date.now }
}));
