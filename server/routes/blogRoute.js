const express = require("express");
const router = express.Router();
const { isAdmin } = require("../middleware/uservalidate");
const {
    BlogCategoryCreate,
    GetBlogCategory,
    UpdateBlogCategory,
    getBlogCategorybyId,
    DeleteBlogCategory,
} = require("../controller/blogCategoryController");
const {  createBlog,
    GetAllBlog,
    getSingleBlogByID,
    getBlogsByCategory,
    UpdateBogById,
    DeletBlogById,getSingleBlogBySlug,   CreateReview,
    getReviewByBlogId,
    VerifyReview,
    deteReview,
    GetAllRevies}=require("../controller/blogController")

// [* for Admin *] 

        // blog category 
router.post("/category", isAdmin, BlogCategoryCreate);
router.put("/category/:id", isAdmin, UpdateBlogCategory);
router.get("/category/:id", isAdmin,getBlogCategorybyId)
router.delete("/category/:id", isAdmin, DeleteBlogCategory);

        //blog
router.post("/",isAdmin,createBlog);
router.get("/",isAdmin,GetAllBlog);
router.put("/:id",isAdmin,UpdateBogById);
router.delete("/:id",isAdmin,DeletBlogById);

        //blog review
router.put("/review/:id/verify",isAdmin,VerifyReview)
router.get("/review",isAdmin,GetAllRevies);
router.delete("/review/:id",isAdmin,deteReview);

//[* for Public *]
    //category
router.get("/all/category", GetBlogCategory);
    //Blog
router.get("/blogby_category/:category",getBlogsByCategory);
router.get("/:id",getSingleBlogByID);
router.get("/blogslug/:slug",getSingleBlogBySlug)
     //blog review
router.post("/review",CreateReview)
router.get("/review/:blogId",getReviewByBlogId);

module.exports = router;
