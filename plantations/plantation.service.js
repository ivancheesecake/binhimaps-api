const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Plantation = db.Plantation;

module.exports = {

    getAll,
    getAllPending,
    getById,
    create,
    update,
    delete: _delete,
    getAllTalaga
};

// async function authenticate({ username, password }) {
//     const user = await Plantation.findOne({ username });
//     if (user && bcrypt.compareSync(password, user.hash)) {
//         const { hash, ...userWithoutHash } = user.toObject();
//         const token = jwt.sign({ sub: user.id }, config.secret);
//         return {
//             ...userWithoutHash,
//             token
//         };
//     }
// }

async function getAll(siteId) {
    console.log(siteId)
    if(siteId!="Administrator")
        return await Plantation.find({status: {$ne : "Pending"}, site_id: siteId }).sort({siteyear:1}).select('-hash');
    else{
        return await Plantation.find({status: {$ne : "Pending"}}).sort({siteyear:1}).select('-hash');
    }

}

async function getAllTalaga() {
    
    return await Plantation.find().sort({siteyear:1}).select('-hash');

}



async function getAllPending(siteId) {
    console.log(siteId)
    if(siteId!="Administrator"){
        return await Plantation.find({status:"Pending", site_id: siteId }).select('-hash');
    }
 else{
        return await Plantation.find({status:"Pending"}).select('-hash');
    }
}

async function getById(id) {
    return await Plantation.findById(id).select('-hash');
}


// async function getPending() {
//     return await Plantation.findById(id).select('-hash');
// }



async function create(userParam) {
    // validate
    // if (await Plantation.findOne({ username: userParam.username })) {
    //     throw 'Plantationname "' + userParam.username + '" is already taken';
    // }

    const plantation = new Plantation(userParam);
    
    // hash password
    // if (userParam.password) {
    //     user.hash = bcrypt.hashSync(userParam.password, 10);
    // }

    // save user
    await plantation.save();
}

async function update(id, userParam) {
    const plantation = await Plantation.findById(id);

    // validate
    if (!plantation) throw 'Plantation not found';

    // copy userParam properties to user
    Object.assign(plantation, userParam);
    await plantation.save();
}

async function _delete(id) {
    console.log("HEEEERE");
    await Plantation.findByIdAndRemove(id);
}