const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const databaseConnect = require("./config/database");
const rootEndPoint = require("./config/endpoint");
app.use(cors());
app.use(bodyParser.json());
mongoose.set("strictQuery", false);
require("dotenv").config();

const usersRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");
const categoryRoute = require("./routes/categoryRoute");
const companyRoute=require("./routes/companyRoute");
const productRoute=require("./routes/productRoute")
databaseConnect();

const routes = [
  {
    path: `${rootEndPoint}/user/`,
    func: usersRoute,
  },
  {
    path: `${rootEndPoint}/admin/`,
    func: adminRoute,
  },
  {
    path: `${rootEndPoint}/admin/`,
    func: categoryRoute,
  },
  {
    path: `${rootEndPoint}/company/`,
    func: companyRoute,
  },
  {
    path: `${rootEndPoint}/product/`,
    func: productRoute,
  },
];
routes.forEach(({ path, func }) => {
  app.use(path, func);
});
app.get("/", (req, res) => {
  res.send("WOrking Tree");
});
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.listen(process.env.PORT, (port) => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
