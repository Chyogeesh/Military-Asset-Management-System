{
  name: String,
  email: String,
  password: String (hashed),
  role: "Admin" | "Commander" | "Logistics",
  base: ObjectId  // ref Base
}
