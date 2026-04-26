const mongoose = require("mongoose");
const MONGO_URI =
  "mongodb+srv://phamhungtp2005_db_user:EETQAWrXfq7XiO27@cluster0.06tutrj.mongodb.net/webdemo-thsport?retryWrites=true&w=majority";

mongoose
  .connect(MONGO_URI, { user: "admin", pass: "thsport123" })
  .then(async () => {
    const User = require("./app/models/User");
    const u = await User.findOne({ email: "tuan@example.com" });
    console.log("User found:", u ? "YES" : "NO");
    if (u) {
      console.log("Role:", u.role);
      console.log("Password hash:", u.password.substring(0, 20) + "...");
    }
    process.exit(0);
  })
  .catch((e) => {
    console.log("Error:", e.message);
    process.exit(1);
  });
