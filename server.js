const express = require("express");
const connectDB = require("./config/db");
const app = express();
const PORT = process.env.PORT || 5000;

app.use("/api/users", require("./Routes/users"));
app.use("/api/profiles", require("./Routes/profile"));
app.use("/api/auth", require("./Routes/auth"));
app.use("/api/posts", require("./Routes/posts"));

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
