const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Site = db.Site;

module.exports = {

    getAll,
    getById,
    create,
    update,
    delete: _delete
};

// async function authenticate({ username, password }) {
//     const user = await Site.findOne({ username });
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
    return await Site.find().sort( { code: 1 } ).select('-hash');
}

async function getById(id) {
    return await Site.findById(id).select('-hash');
}

async function create(userParam) {
    // validate
    // if (await Site.findOne({ username: userParam.username })) {
    //     throw 'Sitename "' + userParam.username + '" is already taken';
    // }

    const site = new Site(userParam);

    // hash password
    // if (userParam.password) {
    //     user.hash = bcrypt.hashSync(userParam.password, 10);
    // }

    // save user
    await site.save();
}

async function update(id, userParam) {
    const site = await Site.findById(id);

    // validate
    if (!site) throw 'Site not found';

    // copy userParam properties to user
    Object.assign(site, userParam);
    await site.save();
}

async function _delete(id) {
    console.log("HEEEERE");
    await Site.findByIdAndRemove(id);
}