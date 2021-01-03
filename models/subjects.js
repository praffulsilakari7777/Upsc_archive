const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const subjectsSchema = new Schema({
    subjectName: { type: String, required: true },
    image: {type:String, required:true},
    chapters: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Chapters' }],
    classNo: { type: mongoose.Types.ObjectId, required: true, ref: 'Classes' }
    
});

module.exports = mongoose.model('Subjects', subjectsSchema);
