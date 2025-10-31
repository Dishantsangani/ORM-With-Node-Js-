const express = require("express");
const sequelize = require("./DB/dbconnection");
const User = require("./model/user");

const app = express();
app.use(express.json());

const port = 2700;

(async () => {
  try {
    await sequelize.sync({ alter: true }); // ✅ Creates/updates table
    console.log("🧩 All models synced successfully");
  } catch (err) {
    console.error("❌ Sync error:", err);
  }
})();

app.get("/get", async (req, res) => {
  try {
    const user = await User.findAll(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/get/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/create", async (req, res) => {
  try {
    const user = await User.create(req.body); // ✅ Table exists now
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await User.update(req.body, { where: { id } });
    const user = await User.findByPk(id);
    res.json(user || { message: "User not found" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.destroy({ where: { id } });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(200).json({ message: error.message });
  }
});

app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
