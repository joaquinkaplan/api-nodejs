require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbConnect = require("./config/mongo");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("storage"));

const port = process.env.PORT || 3000;

// ROUTES
app.use("/api", require("./routes"));

app.listen(port, () => {
  console.log(
    `Your app is listening in port: ${port}. enter in http://localhost:${port} to see more`
  );
});

dbConnect();
