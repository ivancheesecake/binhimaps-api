const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Plantation = db.Plantation;
const Notifications = db.Notifications;
const User = db.User;

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
    // console.log(siteId)
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
    // console.log(siteId)
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


function getSupervisors(site_id){

    var query = User.find({site:site_id, role:"Supervisor"});
    return query;
}


async function create(userParam) {


    // validate
    // if (await Plantation.findOne({ username: userParam.username })) {
    //     throw 'Plantationname "' + userParam.username + '" is already taken';
    // }

    const plantation = new Plantation(userParam);

    // console.log(userParam)
    console.log("START")
    
    // Create notifications

    // Get the supervisors for notifications!!!!
    query = getSupervisors(userParam.site_id);
    query.exec(function(err,docs){

        if(err)
            return console.log(err)

        docs.forEach(function(docs){
            console.log(docs)
            // QUINGINA ANG HABANG PROSESO HAHAHAHA
            // Pero dito ka gagawa ng notifications
     
            notificationData = userParam.notificationData;
            notificationData.plantation_id = plantation._id;
            notificationData.to = docs._id;
            notificationData.to_username = docs.username;

            const notification = new Notifications(notificationData);
            notification.save();

        })


    });

    // console.log(plantation._id);
    // console.log(userParam.notificationData);
    console.log("END")

    
    


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

    // Create Notifications

    query = getSupervisors(userParam.site_id);
    query.exec(function(err,docs){

        if(err)
            return console.log(err)

        docs.forEach(function(docs){
            console.log(docs)
            // QUINGINA ANG HABANG PROSESO HAHAHAHA
            // Pero dito ka gagawa ng notifications
     
            notificationData = userParam.notificationData;
            notificationData.plantation_id = plantation._id;
            notificationData.to = docs._id;
            notificationData.to_username = docs.username;
            const notification = new Notifications(notificationData);
            notification.save();

        })


    });


    // copy userParam properties to user
    Object.assign(plantation, userParam);
    await plantation.save();
}

async function _delete(id) {
    console.log("HEEEERE");
    await Plantation.findByIdAndRemove(id);
}