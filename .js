app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "test123",
  "role": "Commander"
}
