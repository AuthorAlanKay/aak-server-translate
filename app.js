"use strict";

const express = require("express");

const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// 端口号
const port = 30005;

app.listen(port, () =>
  console.log(`Express server listening at http://localhost:${port}`)
);

const root = require("./routes/root");

app.use("/", root);
