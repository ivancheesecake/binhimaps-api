const config = require('config.json');
const mongoose = require('mongoose');
mongoose.connect(config.connectionString);
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../users/user.model'),
    Site: require('../sites/site.model'),
    Species: require('../species/species.model'),
    FarmerAssociation: require('../farmer_associations/farmer_association.model'),
    Plantation: require('../plantations/plantation.model'),
    MaintenanceEntry: require('../maintenance_entries/maintenance_entry.model'),
    Notifications: require('../notifications/notifications.model')
};