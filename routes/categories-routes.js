const express = require('express');
const { check } = require('express-validator');

const categoriesControllers = require('../controllers/categories-controllers');
const fileUpload = require('../middleware/file-upload');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();


router.post('/createCategory', categoriesControllers.createcategory);
router.post('/createMaterial', fileUpload.single('materialLink'), categoriesControllers.creatematerial);
router.get('/', categoriesControllers.getcategories);
router.get('/getmaterialsbycategory/:catid', categoriesControllers.getMaterialsByCategoryId);
router.get('/getmaterialsbymaterialid/:mid', categoriesControllers.getMaterialByMaterialId);
router.get('/getcategorybycategoryid/:catid', categoriesControllers.getCategoryByCategoryId);

// 127.0.0.1:5000/api/category/createcategory

module.exports = router;