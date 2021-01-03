const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const chaptersSchema = new Schema({
    chapterNumber: { type: Number, required: true },
    chapterName: {type: String, required: true },
    chapterLink: {type: String, required: true},
    solutionLink: {type: String},
    image: {type: String, required: true },
    subject: { type: mongoose.Types.ObjectId, required: true, ref: 'Subjects' },
    description: { type: String, required: true }
    
});

module.exports = mongoose.model('Chapters', chaptersSchema);
