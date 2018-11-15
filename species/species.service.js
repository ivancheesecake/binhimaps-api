const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Species = db.Species;

module.exports = {

    getAll,
    getById,
    create,
    update,
    delete: _delete
};

// async function authenticate({ username, password }) {
//     const user = await Species.findOne({ username });
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
    return await Species.find().select('-hash');
}

async function getById(id) {
    return await Species.findById(id).select('-hash');
}

async function create(userParam) {
    // validate
    // if (await Species.findOne({ username: userParam.username })) {
    //     throw 'Speciesname "' + userParam.username + '" is already taken';
    // }

    const species = new Species(userParam);

    // hash password
    // if (userParam.password) {
    //     user.hash = bcrypt.hashSync(userParam.password, 10);
    // }

    // save user
    await species.save();
}

async function update(id, userParam) {
    const species = await Species.findById(id);

    // validate
    if (!species) throw 'Species not found';

    // copy userParam properties to user
    Object.assign(species, userParam);
    await species.save();
}

async function _delete(id) {
    console.log("HEEEERE");
    await Species.findByIdAndRemove(id);
}