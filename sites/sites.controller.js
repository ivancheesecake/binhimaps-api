const express = require('express');
const router = express.Router();
const siteService = require('./site.service');

// routes
// router.post('/authenticate', authenticate);
router.post('/create', addSite);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

// function authenticate(req, res, next) {
//     siteService.authenticate(req.body)
//         .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
//         .catch(err => next(err));
// }

function addSite(req, res, next) {
    siteService.create(req.body)
        .then(() => res.json({ message: 'Site successfully added.' }))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    console.log("HUH");
    siteService.getAll()
        .then(sites => res.json(sites))
        .catch(err => next(err));
}

function getById(req, res, next) {
    siteService.getById(req.params.id)
        .then(user => site ? res.json(site) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    siteService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {

    console.log("NANDITO");
    siteService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}