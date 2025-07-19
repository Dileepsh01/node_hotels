require('dotenv').config()

const mongoose = require("mongoose");

//  const mongoURL = "mongodb://127.0.0.1:27017/hotels";
// const mongoURL = "mongodb+srv://dileep_sh_01:Test@cluster0.trwhqje.mongodb.net/"
const mongoURL = process.env.MONGODB_URL

 mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});



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
