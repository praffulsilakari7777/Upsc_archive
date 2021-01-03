const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const blocksSchema = new Schema({
    heading: { type: String, required: true },
    blockDescription: { type: String, required: true },
    links: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Links' }],
    pageId: { type: mongoose.Types.ObjectId, required: true, ref: 'Pages' },
    
});

module.exports = mongoose.model('Blocks', blocksSchema);
