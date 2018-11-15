const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    
    code: { type: String, required: true },
    name: { type: String, required: true },
    location: { type: String, required: true },

});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Site', schema);