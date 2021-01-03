const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categoriesSchema = new Schema({
    categoryName: { type: String, required: true },
    materials: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Materials' }],
    
});

module.exports = mongoose.model('Categories', categoriesSchema);
