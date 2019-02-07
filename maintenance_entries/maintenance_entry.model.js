const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
     
    plantation_code: { type: String, required: true },
    site: { type: String, required: true },
    site_id: { type: String, required: true },
    plantation_id: { type: String, required: true },
    created_by: { type: String, required: true },
    wor: { type: String, default: "", required: true },
    wor_amount: { type: Number, default: "" },
    date_conducted: { type: Date, default: "", required: true  },
    fruit_trees: { type: Schema.Types.Mixed, default: {} },
    materials: { type: Schema.Types.Mixed, default: {} },
    weight_fertilizer: { type: Number, default: "" },
    amount_fertilizer: { type: Number, default: "" },
    amount_fertilization: { type: Number, default: "" },
    amount_hauling: { type: Number, default: "" },
    weeding_type: { type: String, default: "" },
    amount_weeding: { type: Number, default: "" },
    amount_replanting: { type: Number, default: "" },
    num_firelines: { type: Number, default: "" },
    amount_firelines: { type: Number, default: "" },
    num_watchtowers: { type: Number, default: "" },
    amount_watchtowers: { type: Number, default: "" },
    num_signboards: { type: Number, default: "" },
    amount_signboards: { type: Number, default: "" },
    other_equipment: { type: Number, default: "" },
    mointoring_implementation: { type: Number, default: "" },
    survival_rate: { type: Number, default: "" },
    status: { type: String, default: "" },

});

var timestamps = require('mongoose-timestamp');
schema.plugin(timestamps)

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('MaintenanceEntry', schema);