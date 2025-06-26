const Assignment = require("../models/Assignment");
const Asset = require("../models/Asset");

exports.createAssignment = async (req, res) => {
  const { asset: assetId, quantity } = req.body;

  // 1️⃣ decrease available & increase assigned
  const asset = await Asset.findById(assetId);
  if (asset.quantity - asset.assigned - asset.expended < quantity)
    return res.status(400).json({ error: "Not enough unassigned items" });

  await Asset.findByIdAndUpdate(assetId, {
    $inc: { assigned: quantity }
  });

  const assignment = await Assignment.create(req.body);
  res.status(201).json(assignment);
};

exports.expendAsset = async (req, res) => {
  const { assetId, quantity } = req.body;
  await Asset.findByIdAndUpdate(assetId, {
    $inc: { expended: quantity, assigned: -quantity }
  });
  res.json({ message: "Asset marked expended" });
};

exports.getAssignments = async (_req, res) => {
  const list = await Assignment.find().populate("asset");
  res.json(list);
};
