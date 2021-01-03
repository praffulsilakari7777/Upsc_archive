const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const materialsSchema = new Schema({
    fileName: {type: String, required: true },
    materialLink: {type: String, required: true},
    category: { type: mongoose.Types.ObjectId, required: true, ref: 'Categories' }
    
});

module.exports = mongoose.model('Materials', materialsSchema);
