const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema({
  asset: { type: mongoose.Schema.Types.ObjectId, ref: "Asset" },
  quantity: Number,
  date: { type: Date, default: Date.now },
  base: { type: mongoose.Schema.Types.ObjectId, ref: "Base" },
}, { timestamps: true });

module.exports = mongoose.model("Purchase", purchaseSchema);
