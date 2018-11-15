const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const MaintenanceEntry = db.MaintenanceEntry;

module.exports = {

    getAll,
    getAllPending,
    getById,
    create,
    update,
    delete: _delete,
    getByPlantation
};

// async function authenticate({ username, password }) {
//     const user = await MaintenanceEntry.findOne({ username });
//     if (user && bcrypt.compareSync(password, user.hash)) {
//         const { hash, ...userWithoutHash } = user.toObject();
//         const token = jwt.sign({ sub: user.id }, config.secret);
//         return {
//             ...userWithoutHash,
//             token
//         };
//     }
// }

async function getAll() {
    return await MaintenanceEntry.find({status: {$ne : "Pending"}}).select('-hash');
}

async function getAllPending(siteId) {

    console.log(siteId)

    if(siteId!="Administrator"){
        return await MaintenanceEntry.find({"status":"Pending", "site_id": siteId }).select('-hash');
    }
     else{
        //  console.log("HEEEERE");
        return await MaintenanceEntry.find({status:"Pending"}).select('-hash');
    }

}

async function getById(id) {
    return await MaintenanceEntry.findById(id).select('-hash');
}

async function getByPlantation(plantation_id) {
    return await MaintenanceEntry.find({plantation_id:plantation_id,status:"Approved"}).select('-hash');
}

// async function getPending() {
//     return await MaintenanceEntry.findById(id).select('-hash');
// }



async function create(userParam) {
    // validate
    // if (await MaintenanceEntry.findOne({ username: userParam.username })) {
    //     throw 'MaintenanceEntryname "' + userParam.username + '" is already taken';
    // }

    const plantation = new MaintenanceEntry(userParam);
    
    // hash password
    // if (userParam.password) {
    //     user.hash = bcrypt.hashSync(userParam.password, 10);
    // }

    // save user
    await plantation.save();
}

async function update(id, userParam) {
    const plantation = await MaintenanceEntry.findById(id);

    // validate
    if (!plantation) throw 'MaintenanceEntry not found';

    // copy userParam properties to user
    Object.assign(plantation, userParam);
    await plantation.save();
}

async function _delete(id) {
    console.log("HEEEERE");
    await MaintenanceEntry.findByIdAndRemove(id);
}