const express = require('express');
const router = express.Router();
const {isAdmin,isUser}=require('../middleware/uservalidate');
const {CreateProduct,GetAllProduct,GetProductById,UpdateProduct,DeleteProduct,GetProductByCategory}=require("../controller/productController");

router.post("/create",isAdmin,CreateProduct);
router.get("/",isAdmin,GetAllProduct);
router.put("/:id",isAdmin,UpdateProduct);
router.delete("/:id",isAdmin,DeleteProduct);


router.get("/bycategory/:category",GetProductByCategory);
router.get("/:id",GetProductById);

module.exports = router;