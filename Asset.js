{
  assetType: "Weapon" | "Vehicle" | "Ammunition",
  name: String,
  quantity: Number,
  base: ObjectId,  // ref Base
  assigned: Number,
  expended: Number
}
