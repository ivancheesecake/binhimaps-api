const express = require('express');
const router = express.Router();
const speciesService = require('./species.service');

// routes
// router.post('/authenticate', authenticate);
router.post('/create', addSite);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

// function authenticate(req, res, next) {
//     speciesService.authenticate(req.body)
//         .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
//         .catch(err => next(err));
// }

function addSite(req, res, next) {
    speciesService.create(req.body)
        .then(() => res.json({ message: 'Species successfully added.' }))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    console.log("HUH");
    speciesService.getAll()
        .then(speciess => res.json(speciess))
        .catch(err => next(err));
}

function getById(req, res, next) {
    speciesService.getById(req.params.id)
        .then(user => species ? res.json(species) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    speciesService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {

    console.log("NANDITO");
    speciesService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}