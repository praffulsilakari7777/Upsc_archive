
const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');
const Subjects = require('../models/subjects');
const Chapters = require('../models/chapters');
const Classes = require('../models/classes');
const User = require('../models/user');
const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');
const chapters = require('../models/chapters');




exports.getclasses = async (req, res, next ) => {
    let classes;
    try {
        classes = await Classes.find().sort( { classNo: -1 }).populate('subjects');
        
        
    } catch (err) {
        const error = new HttpError('Something went wrong, could not find a classes.',500);
        return next(error); 
    }



    if(!classes) {
        const error = HttpError('No class found.',404);
        return next(error);
    }
    //console.log(classes.subjects.chapters.length());
    res.json({ Classes: classes });
};



exports.getSubjectsByClassId = async (req, res, next ) => {
    const ClassId = req.params.cid;


    let subjects;
    try {
        subjects = await Subjects.find({classNo: ClassId}).sort( { "subjectName": 1 });
        
        
    } catch (err) {
        const error = new HttpError('Something went wrong, could not find a subjects.',500);
        return next(error); 
    }



    if(!subjects) {
        const error = HttpError('No subject found.',404);
        return next(error);
    }
    //console.log(classes.subjects.chapters.length());
    res.json({ Subjects: subjects });
};



exports.getChaptersBySubjectId = async (req, res, next ) => {
    const SubjectId = req.params.sid;

    let chapters;
    try {
        chapters = await Chapters.find({subject: SubjectId}).sort( { chapterNumber: 1 });
        
        
    } catch (err) {
        const error = new HttpError('Something went wrong, could not find a chapter.',500);
        return next(error); 
    }



    if(!chapters) {
        const error = HttpError('No chapter found.',404);
        return next(error);
    }
    //console.log(classes.subjects.chapters.length());
    res.json({ Chapters: chapters });
};


exports.createchapter = async(req, res, next) => {
const {chapterNumber, subject, chapterName, description} = req.body;
// const title = req.body.title;
const createdChapter = new Chapters({
   chapterName,
   chapterNumber,
   chapterLink: req.files.chapterLink[0].path,
   subject,
   image: req.files.image[0].path,
   description
});

let Subject;
let chap;

try {
    Subject = await Subjects.findById(subject);
    chap = await Chapters.findOne({chapterNumber: chapterNumber, subject: subject});
} catch (err) {
    const error = new HttpError('Creating Chapter failed, please try again', 500);
    return next(error);
}

if (chap) {
    const error = new HttpError('Chapter exists already, please login instead.', 422);
    return next(error);
}

if(!Subject) {
    const error = new HttpError('Could not find subject for provided id', 404);
    return next (error);
}

console.log(Subject);
console.log(createdChapter);

try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdChapter.save({ session: sess });
    Subject.chapters.push(createdChapter);
    await Subject.save({ session: sess });
    await sess.commitTransaction();
} catch (err) {
    const error = new HttpError('Creating Chapter Failed, please try again.', 500);
    return next(error);
}

res.status(201).json({Chapter: createdChapter});
};




exports.createsubject = async(req, res, next) => {
    const {subjectName, classNo} = req.body;
    // const title = req.body.title;
    const createdSubject = new Subjects({
        subjectName,
        chapters: [],
        classNo,
        image: req.file.path
     });
    
    let Class;
    
    try {
        Class = await Classes.findById(classNo);
    } catch (err) {
        const error = new HttpError('Creating Subject failed, please try again', 500);
        return next(error);
    }
    
    if(!Class) {
        const error = new HttpError('Could not find Class for provided id', 404);
        return next (error);
    }
    
    console.log(Class);
    console.log(createdSubject);
    
    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createdSubject.save({ session: sess });
        Class.subjects.push(createdSubject);
        await Class.save({ session: sess });
        await sess.commitTransaction();
    } catch (err) {
        const error = new HttpError('Creating Subject Failed, please try again.', 500);
        return next(error);
    }
    
    res.status(201).json({Subject: createdSubject});
    };


    exports.createUserBooks = async(req, res, next) => {
        let chapter = req.params.caid;
        let {user} = req.body;
        // const title = req.body.title;
        // const createdUserBooks = new UserBooks({
        //    chapter,
        //    user
        //  });
        
        let userBooks;
        
        try {
            userBooks = await User.findById(user);
        } catch (err) {
            const error = new HttpError('Adding to Download failed, please login first', 500);
            return next(error);
        }
        const chap = userBooks.chapters.find(e => e == chapter);
        
        if(!userBooks) {
            const error = new HttpError('Could not find user for provided id', 404);
            return next (error);
        }

        
        if(chap) {
            const error = new HttpError('Already Added to Downloads', 404);
            return next (error);
        }
     

       console.log(chap);
        console.log(userBooks);
        //console.log(createdUserBooks);
        try {
            const sess = await mongoose.startSession();
            sess.startTransaction();
            userBooks.chapters.push(chapter);
            await userBooks.save({ session: sess });
            await sess.commitTransaction();
        } catch (err) {
            const error = new HttpError('Adding to Download Failed, please try again.', 500);
            return next(error);
        }
        
        res.status(201).json({UserBooks: chapter});
        };




    exports.createclass = async(req, res, next) => {
        const { classNo, image } = req.body;
        // const title = req.body.title;
        const createdClass = new Classes({
            classNo,
            subjects: [],
            image: req.file.path
         });
        
       
        
         try {
            await createdClass.save();
        } catch (err) {
            const error = new HttpError('creating class Failed, please try again.', 500);
            return next(error);
        }
    
        res.status(201).json({
            Class: createdClass.toObject({ getters: true })
        });
        };



        exports.getChapterById = async (req, res, next ) => {
            const cid = req.params.cid;
            let chapter;

            try {  
                chapter = await Chapters.findById(cid);
                
                
            } catch (err) {
                const error = new HttpError('Something went wrong, could not find a chapter.',500);
                return next(error); 
            }
        
        
        
            if(!chapter) {
                const error = HttpError('No chapter found.',404);
                return next(error);
            }
            //console.log(classes.subjects.chapters.length());
            res.json({ Chapter: chapter });
        };


        
        exports.getSubjectById = async (req, res, next ) => {
            const sId = req.params.sid;
            let subject;

            try {
                subject = await Subjects.findById(sId);
                
                
            } catch (err) {
                const error = new HttpError('Something went wrong, could not find a chapter.',500);
                return next(error); 
            }
        
        
        
            if(!subject) {
                const error = HttpError('No chapter found.',404);
                return next(error);
            }
            //console.log(classes.subjects.chapters.length());
            res.json({ Subject: subject });
        };



        exports.getChapterByUserId = async (req, res, next ) => {
            const uid = req.params.uid;
            let userbooks;

            try {
                 userbooks = await User.findById(uid).populate('chapters');
                
                
            } catch (err) {
                const error = new HttpError('Something went wrong, could not find a chapter.',500);
                return next(error); 
            }
        
        
        
            if(!userbooks) {
                const error = HttpError('No chapter found.',404);
                return next(error);
            }
            //console.log(classes.subjects.chapters.length());
            res.json({UserBooks: userbooks.chapters.map(chapter => chapter.toObject({ getters: true }))});
        };


        exports.getUserBooksBoolean = async(req, res, next) => {
            let chapter = req.params.caid;
            let {user} = req.body;
            // const title = req.body.title;
            // const createdUserBooks = new UserBooks({
            //    chapter,
            //    user
            //  });
            
            let userBooks;
            let ans=false;
            
            try {
                userBooks = await User.findById(user);
            } catch (err) {
                const error = new HttpError('Adding to Download failed, please login first', 500);
                return next(error);
            }
            const chap = userBooks.chapters.find(e => e == chapter);
    
                                       
            if(chap) {
                ans=true;
            }
            
         
        
            
            res.status(201).json(ans);
            };
    
    
    

            exports.deleteuserBooks = async (req, res, next) => {
                let chapter = req.params.caid;
                let {user} = req.body;
               
                let userBooks;
                let chap;
                try {
                    userBooks = await User.findById(user);
                } catch (err) {
                    const error = new HttpError('Something went wrong, Could not delete place.', 500);
                    return next(error);
                }
              
               if (!userBooks) {
                   const error = new HttpError('Could not find user for this id', 404);
                   return next(error);
               }

                chap = userBooks.chapters.find(e => e == chapter);
            
                console.log(userBooks);
                console.log(chap);
                try {
                    const sess = await mongoose.startSession();
                    sess.startTransaction();
                    userBooks.chapters.pull(chap);
                    await userBooks.save({session: sess});
                    await sess.commitTransaction();
            
                } catch (err) {
                    const error = new HttpError('Something went wrong, Could not delete chapter.', 500);
                    return next(error);
                }
                res.status(200).json({message: 'Deleted chapter.'});
            };
    
        
            
exports.updateChapter = async (req, res, next) => {
    const {chapterName, chapterNumber, description} = req.body;
    const cId = req.params.caid;



    let chapter
   try {
       chapter = await Chapters.findById(cId);
      await chapter.updateOne({$set: {"solutionLink": req.file.path}});
      
      console.log(chapter);
   } catch (err) {
            const error = new HttpError('Something went wrong, could not update place.', 500);
            return next(error);
   }

    chapter.chapterName = chapterName;
    chapter.chapterNumber = chapterNumber;
    chapter.description = description;
   // chapter.solutionLink = req.files.solutionLink[0].path;

    try { 
    //    await chapter.updateOne({$set: {"solutionLLink": req.file.path}});
        await chapter.save();
       
    } catch (err) { 
        const error = new HttpError('Something went wrong, could not update place', 500);
        return next(error);
    }

    res.status(200).json({chapter: chapter.toObject({ getters: true })});
    
};


exports.deleteChapter = async (req, res, next) => {
    const cId = req.params.caid;
   
    let chapter;
    let subject;
    try {
        chapter = await Chapters.findById(cId);
        subject = await Subjects.findById(chapter.subject);
        console.log(subject);
    } catch (err) {
        const error = new HttpError('Something went wrong, Could not delete place.', 500);
        return next(error);
    }

   if (!chapter) {
       const error = new HttpError('Could not find place for this id', 404);
       return next(error);
   }

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await chapter.remove({session: sess});
        await subject.chapters.pull(cId);
        // chapter.subject.chapters.pull(chapter);
          await subject.save({session: sess});
        await sess.commitTransaction();

    } catch (err) {
        const error = new HttpError('Something went wrong, Could not delete place.', 500);
        return next(error);
    }
    res.status(200).json({message: 'Deleted place.'});
};







exports.updateSubject = async (req, res, next) => {
    const {subjectName} = req.body;
    const sId = req.params.sid;



    let subject
   try {
       subject = await Subjects.findById(sId)
console.log(subject);
   } catch (err) {
            const error = new HttpError('Something went wrong, could not update place.', 500);
            return next(error);
   }

    subject.subjectName = subjectName;
    

    try { 
        await subject.save();
       
    } catch (err) { 
        const error = new HttpError('Something went wrong, could not update place', 500);
        return next(error);
    }

    res.status(200).json({subject: subject.toObject({ getters: true })});
    
};








exports.deleteSubject = async (req, res, next) => {
    const sId = req.params.sid;
   
    let subject;
    let classes;
    try {
        subject = await Subjects.findById(sId);
        classes = await Classes.findById(subject.classNo);
        console.log(classes);
    } catch (err) {
        const error = new HttpError('Something went wrong, Could not delete place.', 500);
        return next(error);
    }

   if (!subject) {
       const error = new HttpError('Could not find place for this id', 404);
       return next(error);
   }

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await subject.remove({session: sess});
        await classes.subjects.pull(sId);
        // chapter.subject.chapters.pull(chapter);
          await classes.save({session: sess});
        await sess.commitTransaction();

    } catch (err) {
        const error = new HttpError('Something went wrong, Could not delete place.', 500);
        return next(error);
    }
    res.status(200).json({message: 'Deleted subject.'});
};
