const express = require('express');
const { check } = require('express-validator');

const booksControllers = require('../controllers/books-controllers');
const fileUpload = require('../middleware/file-upload');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();


router.get('/', booksControllers.getclasses);
router.get('/:cid', booksControllers.getSubjectsByClassId);
router.get('/chapters/:sid', booksControllers.getChaptersBySubjectId);
router.get('/chapter/:cid', booksControllers.getChapterById);
router.get('/subject/:sid', booksControllers.getSubjectById);
router.get('/user/chapter/:uid', booksControllers.getChapterByUserId);
router.post('/user/userbooks/:caid', booksControllers.getUserBooksBoolean);
router.post('/createChapter', fileUpload.fields([{ name: 'image', maxCount: 1 }, { name: 'chapterLink', maxCount: 1 }]) , booksControllers.createchapter);
router.post('/createSubject', fileUpload.single('image'), booksControllers.createsubject);
router.post('/createClass', fileUpload.single('image'), booksControllers.createclass);
router.patch('/updatechapter/:caid',  fileUpload.single('solutionLink'),  booksControllers.updateChapter);
router.delete('/deletechapter/:caid',  booksControllers.deleteChapter);
router.delete('/deletesubject/:sid',  booksControllers.deleteSubject);
router.patch('/updatesubject/:sid',   booksControllers.updateSubject);
router.post('/createUserBooks/:caid', booksControllers.createUserBooks);
router.post('/deleteuserbooks/:caid', booksControllers.deleteuserBooks);
router.get('/chapter/:cid', booksControllers.getChapterById);
// router.get('/:classId', booksControllers.getsubjectsByclassId);
// router.get('/:classId/:subjectId', booksControllers.getallchaptersBysubjectIdandclassId);

// router.post('/:', [
//     check('name').not().isEmpty(),
//     check('email').normalizeEmail().isEmail(),
//     check('password').isLength({ min: 6 })
// ], usersControllers.signup);

// router.post('/login', usersControllers.login);
//console.log("Hi CI/CD");

module.exports = router;
