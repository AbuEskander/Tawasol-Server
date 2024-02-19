const express = require("express");
const app = express();
const connectDB = require("./config/db.js");
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/users", require("./Routes/users"));
app.use("/api/profiles", require("./Routes/profiles"));
app.use("/api/posts", require("./Routes/posts"));

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
