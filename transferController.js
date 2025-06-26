const Transfer = require("../models/Transfer");
const Asset = require("../models/Asset");

exports.createTransfer = async (req, res) => {
  const { asset: assetId, quantity, fromBase, toBase } = req.body;

  // 1️⃣ validate stock
  const sourceAsset = await Asset.findOne({ _id: assetId, base: fromBase });
  if (!sourceAsset || sourceAsset.quantity < quantity)
    return res.status(400).json({ error: "Insufficient stock" });

  // 2️⃣ record transfer
  const transfer = await Transfer.create(req.body);

  // 3️⃣ decrement source, increment destination (create dest asset doc if missing)
  await Asset.findByIdAndUpdate(assetId, { $inc: { quantity: -quantity } });

  await Asset.findOneAndUpdate(
    { name: sourceAsset.name, base: toBase },
    { $inc: { quantity }, $setOnInsert: { assetType: sourceAsset.assetType } },
    { upsert: true, new: true }
  );

  res.status(201).json(transfer);
};

exports.getTransfers = async (req, res) => {
  const filter = req.user.role === "Admin" ? {} : {
    $or: [{ fromBase: req.user.base }, { toBase: req.user.base }]
  };
  const list = await Transfer.find(filter).populate("asset fromBase toBase");
  res.json(list);
};
