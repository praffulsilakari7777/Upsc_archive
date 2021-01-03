const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const pagesSchema = new Schema({
    urlName: { type: String, required: true },
    title: {type: String, required: true},
    metaDescription: {type: String, required: true},
    description: {type: String, required: true},
    blocks: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Blocks' }]
    
});

module.exports = mongoose.model('Pages',pagesSchema);
