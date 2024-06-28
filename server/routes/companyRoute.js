const express = require('express');
const router = express.Router();
const {accountMiddleware,isAdmin,isUser}=require('../middleware/uservalidate');
const { createCompany,GetData,getCompanyById,UpdateCompany,DeleteCompany} = require('../controller/companyController');


router.post('/create',isAdmin, createCompany);
router.get("/",isAdmin,GetData);
router.get("/:id",isAdmin,getCompanyById)
router.put("/update/:id",isAdmin,UpdateCompany);
router.delete("/delete/:id",isAdmin,DeleteCompany);


module.exports = router;