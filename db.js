const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/hotels");

const db = mongoose.connection;

db.on("connected", () => {
    console.log("✅ MongoDB connected");
});

db.on("error", (err) => {
    console.log("❌ MongoDB connection error:", err);
});

db.on("disconnected", () => {
    console.log("⚠️ MongoDB disconnected");
});
