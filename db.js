const mongoose = require("mongoose");


require('dotenv').config();


 
//const mongoURI =   mongoose.connect("mongodb://127.0.0.1:27017/hotels");

// ⬇️ Define your connection URL separately
const mongoURI = process.env.MONGODB_URL;

// ⬇️ Use the variable in mongoose.connect()
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
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
