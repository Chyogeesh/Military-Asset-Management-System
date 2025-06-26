const mongoose = require("mongoose");

const assetSchema = new mongoose.Schema({
  name: String,
  assetType: {
    type: String,
    enum: ["Weapon", "Vehicle", "Ammunition"],
  },
  quantity: Number,
  assigned: { type: Number, default: 0 },
  expended: { type: Number, default: 0 },
  base: { type: mongoose.Schema.Types.ObjectId, ref: "Base" },
}, { timestamps: true });

module.exports = mongoose.model("Asset", assetSchema);
