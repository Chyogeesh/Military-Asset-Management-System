const Asset = require("../models/Asset");

// Create
exports.createAsset = async (req, res) => {
  const asset = await Asset.create(req.body);
  res.status(201).json(asset);
};

// List (Admin sees all, others see only their base)
exports.getAssets = async (req, res) => {
  const filter = req.user.role === "Admin" ? {} : { base: req.user.base };
  const assets = await Asset.find(filter).populate("base");
  res.json(assets);
};

// Update Qty / Meta
exports.updateAsset = async (req, res) => {
  const asset = await Asset.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(asset);
};

// Delete (admin only)
exports.deleteAsset = async (req, res) => {
  await Asset.findByIdAndDelete(req.params.id);
  res.json({ message: "Asset removed" });
};
