const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const classesSchema = new Schema({
    classNo: { type: Number, required: true },
    image: {type: String, required: true},
    subjects: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Subjects' }]
    
});

module.exports = mongoose.model('Classes', classesSchema);
