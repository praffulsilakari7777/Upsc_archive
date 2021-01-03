const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const linksSchema = new Schema({
    linkName: { type: String, required: true },
    linkAddress: {type: String, required: true },
    blockId: { type: mongoose.Types.ObjectId, required: true, ref: 'Blocks' },
    
    
});

module.exports = mongoose.model('Links', linksSchema);
