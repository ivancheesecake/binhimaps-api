const mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

const Schema = mongoose.Schema;

const schema = new Schema({
    
    sitecode: { type: String, required: true },
    siteyear: { type: String, required: true },
    sitelot: { type: String, required: true },
    site_id: { type: String, required: true },
    plantation_code: { type: String, required: true },
    site: { type: String, required: true },
    created_by: { type: String, required: true },
    created_by_id: { type: String, required: true },
    module: { type: String, default: "" },
    nature: { type: String, default: "" },
    vegetation_type: { type: String, default: "" },
    soil_color: { type: String, default: "" },
    soil_texture: { type: String, default: "" },
    seed_dispersers: { type: Schema.Types.Mixed, default: {} },
    slope_range: { type: String, default: "" },
    min_elevation:{type: Number, default: "" },
    max_elevation:{type: Number, default: "" },
    location: { type: String, default: "" },
    wor: { type: String, default: "" },
    wor_amount: { type: Number, default: "" },
    date_establishment: { type: Date, default: "" },
    farmer_association: { type: String, default: "" },
    farmer_association_id: { type: String, default: "" },
    num_farmers: { type: Number, default: "" },
    total_hectarage: { type: Number, default: "" },
    planting_source: { type: Schema.Types.Mixed, default: {}},
    planting_strategy: { type: Schema.Types.Mixed, default: {} },
    species_planted: { type: Schema.Types.Mixed, default: {} },
    regenerants_protected: { type: Number, default: "" },
    survival_rate: { type: Number, default: "" },
    total_seedlings: { type: Number, default: "" },
    history: { type: String, default: "" },
    status: { type: String, default: "" },


});

schema.plugin(timestamps)

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Plantation', schema);