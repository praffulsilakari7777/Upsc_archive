
const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');
const Subjects = require('../models/subjects');
const Materials = require('../models/materials');
const Categories = require('../models/categories');
const User = require('../models/user');
const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');
const chapters = require('../models/chapters');
const materials = require('../models/materials');




exports.createcategory = async(req, res, next) => {
    const { categoryName } = req.body;
    // const title = req.body.title;
    const createdCategory = new Categories({
        categoryName,
        materials: []
     });
    
   
    
     try {
        await createdCategory.save();
    } catch (err) {
        const error = new HttpError('creating category Failed, please try again.', 500);
        return next(error);
    }

    res.status(201).json({
        Categories: createdCategory.toObject({ getters: true })
    });
    };




    
exports.creatematerial = async(req, res, next) => {
    const {fileName, category} = req.body;
    // const title = req.body.title;
    const createdMaterial = new Materials({
       fileName,
       materialLink: req.file.path,
       category
    });
    
    let Category;
    let mat;
    
    try {
        Category = await Categories.findById(category);
        // chap = await Chapters.findOne({chapterNumber: chapterNumber, subject: subject});
    } catch (err) {
        const error = new HttpError('Creating material failed, please try again', 500);
        return next(error);
    }
    
    // if (chap) {
    //     const error = new HttpError('Chapter exists already, please login instead.', 422);
    //     return next(error);
// }
    
    if(!Category) {
        const error = new HttpError('Could not find category for provided id', 404);
        return next (error);
    }
    
    console.log(Category);
    console.log(createdMaterial);
    
    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createdMaterial.save({ session: sess });
        Category.materials.push(createdMaterial);
        await Category.save({ session: sess });
        await sess.commitTransaction();
    } catch (err) {
        const error = new HttpError('Creating Material Failed, please try again.', 500);
        return next(error);
    }
    
    res.status(201).json({Materials: createdMaterial});
    };



    



    exports.getcategories = async (req, res, next ) => {
            let categories;
            try {
                categories = await Categories.find().populate('materials').sort( { "_id": -1 });
                
                
            } catch (err) {
                const error = new HttpError('Something went wrong, could not find a categories.',500);
                return next(error); 
            }

            
    if(!categories) {
        const error = HttpError('No category found.',404);
        return next(error);
    }
    //console.log(classes.subjects.chapters.length());
    res.json({ Categories: categories });
};








exports.getMaterialsByCategoryId = async (req, res, next ) => {
    const CategoryId = req.params.catid;


    let materials;
    try {
        materials = await Materials.find({category: CategoryId}).sort( { "_id": 1 });
        
        
    } catch (err) {
        const error = new HttpError('Something went wrong, could not find a materials.',500);
        return next(error); 
    }



    if(!materials) {
        const error = HttpError('No materials found.',404);
        return next(error);
    }
    //console.log(classes.subjects.chapters.length());
    res.json({ Materials: materials });
};





exports.getMaterialByMaterialId = async (req, res, next ) => {
    const MaterialId = req.params.mid;


    let material;
    try {
        material = await Materials.findById(MaterialId);
        
        
    } catch (err) {
        const error = new HttpError('Something went wrong, could not find a file.',500);
        return next(error); 
    }

    if(!material) {
        const error = HttpError('No file found.',404);
        return next(error);
    }
    //console.log(classes.subjects.chapters.length());
    res.json({ Material: material });
};





exports.getCategoryByCategoryId = async (req, res, next ) => {
    const CategoryId = req.params.catid;


    let category;
    try {
        category = await Categories.findById(CategoryId);
        
        
    } catch (err) {
        const error = new HttpError('Something went wrong, could not find a category.',500);
        return next(error); 
    }

    if(!category) {
        const error = HttpError('No category found.',404);
        return next(error);
    }
    //console.log(classes.subjects.chapters.length());
    res.json({ Category: category });
};