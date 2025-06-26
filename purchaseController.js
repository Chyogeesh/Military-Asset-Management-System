const Purchase = require("../models/Purchase");
const Asset = require("../models/Asset");

exports.createPurchase = async (req, res) => {
  const { asset: assetId, quantity } = req.body;

  // 1️⃣ store purchase
  const purchase = await Purchase.create(req.body);

  // 2️⃣ bump asset balance
  await Asset.findByIdAndUpdate(assetId, { $inc: { quantity } });

  res.status(201).json(purchase);
};

exports.getPurchases = async (req, res) => {
  const filter = req.user.role === "Admin" ? {} : { base: req.user.base };
  if (req.query.start && req.query.end) {
    filter.date = { $gte: req.query.start, $lte: req.query.end };
  }
  const list = await Purchase.find(filter).populate("asset base");
  res.json(list);
};
