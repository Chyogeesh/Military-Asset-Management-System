const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
  asset: { type: mongoose.Schema.Types.ObjectId, ref: "Asset" },
  quantity: Number,
  assignedTo: String,  // e.g., Personnel ID or name
  date: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model("Assignment", assignmentSchema);
