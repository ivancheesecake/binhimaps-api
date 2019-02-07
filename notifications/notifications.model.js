const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    
    to: { type: String, default:""},
    to_username: { type: String, default:""},
    from: { type: String, default:""},
    from_username: { type: String, default:""},
    remarks: { type: String, default:""},
    plantation_id: { type: String, default:""},
    plantation_code: { type: String, default:""},
    maintenance_entry_id: { type: String, default:""},
    type: { type: String, default:""},
    status: { type: String, default:""}

});

var timestamps = require('mongoose-timestamp');
schema.plugin(timestamps)


schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Notifications', schema);