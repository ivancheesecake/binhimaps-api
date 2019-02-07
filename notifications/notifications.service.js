const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Notifications = db.Notifications;

module.exports = {

    getAll,
    getById,
    create,
    update,
    delete: _delete
};

// async function authenticate({ username, password }) {
//     const user = await Notifications.findOne({ username });
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
    return await Notifications.find().sort( { date: 1 } ).select('-hash');
}


// For testing purposes only
function getNotifications(id){

    var query = Notifications.find({to:id}).select('-hash');
    return query;
}



async function getById(id) {

    console.log("KINGINA X2")
    console.log(id)

    query = getNotifications(id);
    query.exec(function(err,docs){

        if(err)
            return console.log(err)

        docs.forEach(function(docs){
            console.log(docs)
            })
    
    });

    // return await Notifications.findById(id).select('-hash');
    return await Notifications.find({to:id}).select('-hash');
}

async function create(userParam) {
    // validate
    // if (await Notifications.findOne({ username: userParam.username })) {
    //     throw 'Notificationsname "' + userParam.username + '" is already taken';
    // }

    const notifications = new Notifications(userParam);

    // hash password
    // if (userParam.password) {
    //     user.hash = bcrypt.hashSync(userParam.password, 10);
    // }

    // save user
    await notifications.save();
}

async function update(id, userParam) {
    const notifications = await Notifications.findById(id);

    // validate
    if (!notifications) throw 'Notifications not found';

    // copy userParam properties to user
    Object.assign(notifications, userParam);
    await notifications.save();
}

async function _delete(id) {
    console.log("HEEEERE");
    await Notifications.findByIdAndRemove(id);
}