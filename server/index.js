const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const databaseConnect = require("./config/database");
const rootEndPoint = require("./config/endpoint");
const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,authorization",
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
mongoose.set("strictQuery", false);
require("dotenv").config();
databaseConnect();

const usersRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");
const categoryRoute = require("./routes/categoryRoute");
const companyRoute = require("./routes/companyRoute");
const productRoute = require("./routes/productRoute");
const blogRoute = require("./routes/blogRoute");
const faqRoute = require("./routes/faqRoute");
const prosconsRoute = require("./routes/prosconsRoute");
const infoguideRoute = require("./routes/infoguideRoute");
const buzzfeed = require("./routes/buzzfeedRoute");
const postRoute = require("./routes/postRoute");
const postCategoryRoute = require("./routes/postCategoryRoute");

const routes = [
  {
    path: `${rootEndPoint}/user/`,
    func: usersRoute,
  },
  {
    path: `${rootEndPoint}/proscons/`,
    func: prosconsRoute,
  },
  {
    path: `${rootEndPoint}/infoguide/`,
    func: infoguideRoute,
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
  {
    path: `${rootEndPoint}/blog/`,
    func: blogRoute,
  },
  {
    path: `${rootEndPoint}/faq/`,
    func: faqRoute,
  },
  {
    path: `${rootEndPoint}/post/`,
    func: postRoute,
  },
  {
    path: `${rootEndPoint}/admin/`,
    func: postCategoryRoute,
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
