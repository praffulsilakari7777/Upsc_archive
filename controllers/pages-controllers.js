
const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');
const Blocks = require('../models/blocks');
const Links = require('../models/links');
const Pages = require('../models/pages');
const User = require('../models/user');
const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');


exports.createpage = async(req, res, next) => {
    const { urlName, title, metaDescription, description } = req.body;
    // const title = req.body.title;
    const createdPage = new Pages({
        urlName,
        title,
        metaDescription,
        description,
        blocks: []
     });
    console.log(createdPage);
   
    
     try {
        await createdPage.save();
    } catch (err) {
        const error = new HttpError('creating page Failed, please try again.', 500);
        return next(error);
    }

    res.status(201).json({
        Page: createdPage.toObject({ getters: true })
    });
    };



    

exports.createblock = async(req, res, next) => {
    const {heading, pageId, blockDescription} = req.body;
    // const title = req.body.title;
    const createdBlock = new Blocks({
        heading,
        blockDescription,
        Links: [],
        pageId,
     });
    
    let Page;
    
    try {
        Page = await Pages.findById(pageId);
    } catch (err) {
        const error = new HttpError('Creating Block failed, please try again', 500);
        return next(error);
    }
    
    if(!Page) {
        const error = new HttpError('Could not find Page for provided id', 404);
        return next (error);
    }
    
    console.log(Page);
    console.log(createdBlock);
    
    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createdBlock.save({ session: sess });
        Page.blocks.push(createdBlock);
        await Page.save({ session: sess });
        await sess.commitTransaction();
    } catch (err) {
        const error = new HttpError('Creating Page Failed, please try again.', 500);
        return next(error);
    }
    
    res.status(201).json({Block: createdBlock});
    };


    exports.createlink = async(req, res, next) => {
        const {linkName, linkAddress, blockId} = req.body;
        // const title = req.body.title;
        const createdLink = new Links({
            linkName,
            linkAddress,
            blockId
        });
        
        let Block;
        let link;
        console.log(createdLink);
        
        try {
            Block = await Blocks.findById(blockId);
            link = await Links.findOne({linkName: linkName, blockId: blockId});
        } catch (err) {
            const error = new HttpError('Creating Link failed, please try again', 500);
            return next(error);
        }
        
        if (link) {
            const error = new HttpError('Link exists already, please login instead.', 422);
            return next(error);
        }
        
        if(!Block) {
            const error = new HttpError('Could not find Block for provided id', 404);
            return next (error);
        }
        
        console.log(Block);
        console.log(createdLink);
        
        try {
            const sess = await mongoose.startSession();
            sess.startTransaction();
            await createdLink.save({ session: sess });
            Block.links.push(createdLink);
            await Block.save({ session: sess });
            await sess.commitTransaction();
        } catch (err) {
            const error = new HttpError('Creating Link Failed, please try again.', 500);
            return next(error);
        }
        
        res.status(201).json({Link: createdLink});
        };



        exports.getpages = async (req, res, next ) => {
            let pages;
            try {
                pages = await Pages.find().populate('blocks').sort( { "_id": -1 });
                
                
            } catch (err) {
                const error = new HttpError('Something went wrong, could not find a pages.',500);
                return next(error); 
            }

            
    if(!pages) {
        const error = HttpError('No pages found.',404);
        return next(error);
    }
    //console.log(classes.subjects.chapters.length());
    res.json({ Pages: pages });
};



exports.getPageByPageId = async (req, res, next ) => {
    const PageId = req.params.pid;


    let page;
    try {
        page = await Pages.find({_id: PageId}).populate('blocks');
        
        
    } catch (err) {
        const error = new HttpError('Something went wrong, could not find a page.',500);
        return next(error); 
    }



    

    if(!page) {
        const error = HttpError('No page found.',404);
        return next(error);
    }
    //console.log(classes.subjects.chapters.length());
    res.json({ Page: page });
};





exports.getLinkByLinkId = async (req, res, next ) => {
    const LinkId = req.params.lid;


    let link;
    try {
        console.log(LinkId);
        link = await Links.findById(LinkId);
        
       console.log(link); 
    } catch (err) {
        const error = new HttpError('Something went wrong, could not find a link.',500);
        return next(error); 
    }

if(!link) {
        const error = HttpError('No link found.',404);
        return next(error);
    }
    //console.log(classes.subjects.chapters.length());
    res.json({ Link: link });
};


exports.getUrlByLink = async (req, res, next ) => {
    const LinkId = req.params.lid;


    let link;
    try {
        console.log(LinkId);
        link = await Links.findById(LinkId);
        block = await Blocks.findById(link.blockId);
        page = await Pages.findById(block.pageId);
        
       console.log(link); 
    } catch (err) {
        const error = new HttpError('Something went wrong, could not find a link.',500);
        return next(error); 
    }

if(!link) {
        const error = HttpError('No link found.',404);
        return next(error);
    }
    //console.log(classes.subjects.chapters.length());
    res.json({ Page: page });
};





exports.getPageDataByPageId = async (req, res, next ) => {
    const PageId = req.params.pid;


    let page;
    try {
        page = await Pages.findById(PageId).populate('blocks');
        
        
    } catch (err) {
        const error = new HttpError('Something went wrong, could not find a page.',500);
        return next(error); 
    }



    

    if(!page) {
        const error = HttpError('No page found.',404);
        return next(error);
    }
    //console.log(classes.subjects.chapters.length());
    res.json({ Page: page });
};



exports.getBlockByBlockId = async (req, res, next ) => {
    const BlockId = req.params.bid;


    let block;
    try {
        block = await Blocks.findById(BlockId);
        
        
    } catch (err) {
        const error = new HttpError('Something went wrong, could not find a block.',500);
        return next(error); 
    }

    if(!block) {
        const error = HttpError('No block found.',404);
        return next(error);
    }
    //console.log(classes.subjects.chapters.length());
    res.json({ Block: block });
};







exports.getBlocksByPageId = async (req, res, next ) => {
    const PageId = req.params.pid;


    let blocks;
    try {
        blocks = await Blocks.find({pageId: PageId}).populate('links').sort( { "heading": 1 });
        
        
    } catch (err) {
        const error = new HttpError('Something went wrong, could not find a blocks.',500);
        return next(error); 
    }



    if(!blocks) {
        const error = HttpError('No blocks found.',404);
        return next(error);
    }
    //console.log(classes.subjects.chapters.length());
    res.json({ Blocks: blocks });
};





exports.getBlocksByPageurlName = async (req, res, next ) => {
    const PageurlName = req.params.punid;


    let blocks;
    try {
        blocks = await Blocks.find({urlName: PageurlName}).populate('links').sort( { "heading": 1 });
        
        
    } catch (err) {
        const error = new HttpError('Something went wrong, could not find a blocks.',500);
        return next(error); 
    }



    if(!blocks) {
        const error = HttpError('No blocks found.',404);
        return next(error);
    }
    //console.log(classes.subjects.chapters.length());
    res.json({ Blocks: blocks });
};







exports.updatePage = async (req, res, next) => {
    const {urlName, title, metaDescription, description} = req.body;
    const PageId = req.params.pid;

    let page

   try {
       page = await Pages.findById(PageId)
console.log(page);
   } catch (err) {
            const error = new HttpError('Something went wrong, could not update page.', 500);
            return next(error);
   }

    page.urlName = urlName;
    page.title = title;
    page.metaDescription = metaDescription;
    page.description = description;
    

    try { 
        await page.save();
       
    } catch (err) { 
        const error = new HttpError('Something went wrong, could not update page', 500);
        return next(error);
    }

    res.status(200).json({page: page.toObject({ getters: true })});
    
};


exports.updateBlock = async (req, res, next) => {
    const {heading, blockDescription} = req.body;
    const BlockId = req.params.bid;

    let block;

   try {
       block = await Blocks.findById(BlockId)
console.log(block);
   } catch (err) {
            const error = new HttpError('Something went wrong, could not update block.', 500);
            return next(error);
   }

    block.heading = heading;
    block.blockDescription = blockDescription;
    

    try { 
        await block.save();
       
    } catch (err) { 
        const error = new HttpError('Something went wrong, could not update block', 500);
        return next(error);
    }

    res.status(200).json({block: block.toObject({ getters: true })});
    
};




exports.updateLink = async (req, res, next) => {
    const {linkName, linkAddress} = req.body;
    const LinkId = req.params.lid;

    let link;

   try {
       link = await Links.findById(LinkId)
console.log(link);
   } catch (err) {
            const error = new HttpError('Something went wrong, could not update link.', 500);
            return next(error);
   }

    link.linkName = linkName;
    link.linkAddress = linkAddress;
    

    try { 
        await link.save();
       
    } catch (err) { 
        const error = new HttpError('Something went wrong, could not update link', 500);
        return next(error);
    }

    res.status(200).json({link: link.toObject({ getters: true })});
    
};




exports.deletePage = async (req, res, next) => {
    const PageId = req.params.pid;
   
    let page;
    try {
        page = await Pages.findById(PageId);
       
        console.log(page);
    } catch (err) {
        const error = new HttpError('Something went wrong, Could not delete page.', 500);
        return next(error);
    }


    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await page.remove({session: sess});
        await sess.commitTransaction();

    } catch (err) {
        const error = new HttpError('Something went wrong, Could not delete page.', 500);
        return next(error);
    }
    res.status(200).json({message: 'Deleted Page.'});
};






exports.deleteBlock = async (req, res, next) => {
    const BlockId = req.params.bid;
   
    let block;
    let page;
    try {
        block = await Blocks.findById(BlockId);
        page = await Pages.findById(block.pageId);
        console.log(page);
    } catch (err) {
        const error = new HttpError('Something went wrong, Could not delete block.', 500);
        return next(error);
    }

   if (!block) {
       const error = new HttpError('Could not find block for this id', 404);
       return next(error);
   }

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await block.remove({session: sess});
        await page.blocks.pull(BlockId);
        // chapter.subject.chapters.pull(chapter);
          await page.save({session: sess});
        await sess.commitTransaction();

    } catch (err) {
        const error = new HttpError('Something went wrong, Could not delete block.', 500);
        return next(error);
    }
    res.status(200).json({message: 'Deleted block.'});
};





exports.deleteLink = async (req, res, next) => {
    const LinkId = req.params.lid;
   
    let link;
    let block;
    try {
        link = await Links.findById(LinkId);
        block = await Blocks.findById(link.blockId);
        console.log(block);
    } catch (err) {
        const error = new HttpError('Something went wrong, Could not delete link.', 500);
        return next(error);
    }

   if (!link) {
       const error = new HttpError('Could not find link for this id', 404);
       return next(error);
   }

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await link.remove({session: sess});
        await block.links.pull(LinkId);
        // chapter.subject.chapters.pull(chapter);
          await block.save({session: sess});
        await sess.commitTransaction();

    } catch (err) {
        const error = new HttpError('Something went wrong, Could not delete link.', 500);
        return next(error);
    }
    res.status(200).json({message: 'Deleted link.'});
};

