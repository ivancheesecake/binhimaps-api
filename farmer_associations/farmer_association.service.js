const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const FarmerAssociation = db.FarmerAssociation;

module.exports = {

    getAll,
    getById,
    create,
    update,
    delete: _delete
};

// async function authenticate({ username, password }) {
//     const user = await FarmerAssociation.findOne({ username });
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
    return await FarmerAssociation.find().select('-hash');
}

async function getById(id) {
    return await FarmerAssociation.findById(id).select('-hash');
}

async function create(userParam) {
    // validate
    // if (await FarmerAssociation.findOne({ username: userParam.username })) {
    //     throw 'FarmerAssociationname "' + userParam.username + '" is already taken';
    // }

    const farmerAssociation = new FarmerAssociation(userParam);

    // hash password
    // if (userParam.password) {
    //     user.hash = bcrypt.hashSync(userParam.password, 10);
    // }

    // save user
    await farmerAssociation.save();
}

async function update(id, userParam) {
    const farmerAssociation = await FarmerAssociation.findById(id);

    // validate
    if (!farmerAssociation) throw 'FarmerAssociation not found';

    // copy userParam properties to user
    Object.assign(farmerAssociation, userParam);
    await farmerAssociation.save();
}

async function _delete(id) {
    console.log("HEEEERE");
    await FarmerAssociation.findByIdAndRemove(id);
}