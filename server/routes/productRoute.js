const express = require('express');
const router = express.Router();
const {isAdmin,isUser}=require('../middleware/uservalidate');
const {CreateProduct,GetAllProduct,GetProductById,  UpdateProductImage,
    getRecommendedProducts,
    getflashSaleProducts,UpdateProduct,DeleteProduct,GetProductByCategory}=require("../controller/productController");

router.post("/create",isAdmin,CreateProduct);
router.get("/",isAdmin,GetAllProduct);
router.put("/:id",isAdmin,UpdateProduct);
router.delete("/:id",isAdmin,DeleteProduct);


router.get("/bycategory/:category",GetProductByCategory);
router.get("/:id",GetProductById);
router.get("/flash/prod",getflashSaleProducts);
router.get("/recomended/prod",getRecommendedProducts);
router.put("/image/:id",UpdateProductImage);
module.exports = router;