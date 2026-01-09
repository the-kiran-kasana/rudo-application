const express = require("express");
const userAuthRoutes = express.Router();
const User = require("../models/User");
const firebaseAuth = require("../middleware/firebaseAuth");


userAuthRoutes.get("/profile", firebaseAuth, async (req, res) => {
  try {
      const { uid, email } = req.user;

      if (!uid)   return res.status(400).json({ message: "UID missing from token" });

      let user = await User.findOne({ firebaseUID: uid });

    if (!user) {
      user = await User.create({
        firebaseUID: uid,
        email: email || "",
        name: email ? email.split("@")[0] : "User",
      });
    }

    res.json({ message: "Authenticated user",  user, });
  } catch (err) {
    console.error("❌ Error saving user:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = userAuthRoutes;
