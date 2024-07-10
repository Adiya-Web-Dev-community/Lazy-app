const express = require('express');
const router = express.Router();
const {isAdmin,isUser}=require('../middleware/uservalidate');
const {CreateProduct,GetAllProduct,GetProductById,UpdateProduct,DeleteProduct}=require("../controller/productController");

router.post("/create",isAdmin,CreateProduct);
router.get("/",isAdmin,GetAllProduct);
router.get("/:id",isAdmin,GetProductById);
router.put("/:id",isAdmin,UpdateProduct);
router.delete("/:id",isAdmin,DeleteProduct);




module.exports = router;