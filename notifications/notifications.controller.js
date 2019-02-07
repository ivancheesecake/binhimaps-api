const express = require('express');
const router = express.Router();
const notificationsService = require('./notifications.service');

// routes
// router.post('/authenticate', authenticate);
router.post('/create', addSite);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

// function authenticate(req, res, next) {
//     notificationsService.authenticate(req.body)
//         .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
//         .catch(err => next(err));
// }

function addSite(req, res, next) {
    notificationsService.create(req.body)
        .then(() => res.json({ message: 'Notification successfully added.' }))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    console.log("HUH");
    notificationsService.getAll()
        .then(notifications => res.json(notifications))
        .catch(err => next(err));
}

function getById(req, res, next) {
    console.log("KINGINA")
    notificationsService.getById(req.params.id)
    .then(notifications => res.json(notifications))
    .catch(err => next(err));

}

function update(req, res, next) {
    notificationsService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {

    console.log("NANDITO");
    notificationsService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}