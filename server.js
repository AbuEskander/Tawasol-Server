const express = require("express");

const App = express();
const PORT = process.env.PROCESS || 5000;

App.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
