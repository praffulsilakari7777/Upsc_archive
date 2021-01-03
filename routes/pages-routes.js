const express = require('express');
const { check } = require('express-validator');

const pagesControllers = require('../controllers/pages-controllers');
const fileUpload = require('../middleware/file-upload');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();


router.post('/createPage', pagesControllers.createpage);
router.post('/createBlock', pagesControllers.createblock);
router.post('/createLink', pagesControllers.createlink);
router.get('/', pagesControllers.getpages);
router.get('/:pid', pagesControllers.getPageByPageId);
router.get('/pagedata/:pid', pagesControllers.getPageDataByPageId);
router.get('/urlbylink/:lid', pagesControllers.getUrlByLink);
router.get('/block/:bid', pagesControllers.getBlockByBlockId);
router.get('/link/:lid', pagesControllers.getLinkByLinkId);
router.get('/blocks/:pid', pagesControllers.getBlocksByPageId);
router.get('/pun/:punid', pagesControllers.getBlocksByPageurlName);
router.patch('/updatepage/:pid',   pagesControllers.updatePage);
router.patch('/updateblock/:bid',   pagesControllers.updateBlock);
router.patch('/updatelink/:lid',   pagesControllers.updateLink);
router.delete('/deletepage/:pid',  pagesControllers.deletePage);
router.delete('/deleteblock/:bid',  pagesControllers.deleteBlock);
router.delete('/deletelink/:lid',  pagesControllers.deleteLink);


module.exports = router;