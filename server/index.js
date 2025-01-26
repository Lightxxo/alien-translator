const express = require("express");
const path = require("path");
const { sequelize } = require("./models");
const app = express();
const port = 7070;
var cors = require("cors");
const routes = require("./router");

sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Database synchronized");
  })
  .catch((err) => {
    console.error("Unable to sync database:", err);
  });

app.use(express.json());
app.use(cors());
app.use("/", routes); 
app.use(express.static(path.join(__dirname, "../build"))); 


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
