const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("API saúde is running...");
});

app.listen(3032);