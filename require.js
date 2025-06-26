const mongoose = require("mongoose");

const transferSchema = new mongoose.Schema({
  asset: { type: mongoose.Schema.Types.ObjectId, ref: "Asset" },
  quantity: Number,
  fromBase: { type: mongoose.Schema.Types.ObjectId, ref: "Base" },
  toBase: { type: mongoose.Schema.Types.ObjectId, ref: "Base" },
  date: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model("Transfer", transferSchema);
