const express = require('express');
const router = express.Router();
const plantationService = require('./plantation.service');

// routes
// router.post('/authenticate', authenticate);
router.post('/create', addPlantation);
router.get('/all/:id', getAll);
router.get('/alltalaga', getAllTalaga);
router.get('/pending/:id', getAllPending);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

// function authenticate(req, res, next) {
//     plantationService.authenticate(req.body)
//         .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
//         .catch(err => next(err));
// }

function addPlantation(req, res, next) {
    plantationService.create(req.body)
        .then(() => res.json({ message: 'Plantation successfully added.' }))
        .catch(err => next(err));
}

function getAllTalaga(req, res, next) {
    // console.log(req.params.id)
    plantationService.getAllTalaga()
        .then(plantations => res.json(plantations))
        .catch(err => next(err));
}


function getAll(req, res, next) {
    // console.log(req.params.id)
    plantationService.getAll(req.params.id)
        .then(plantations => res.json(plantations))
        .catch(err => next(err));
}

function getAllPending(req, res, next) {
    
    plantationService.getAllPending(req.params.id)
        .then(plantations => res.json(plantations))
        .catch(err => next(err));
}

function getById(req, res, next) {
    // plantationService.getById(req.params.id)
    //     .then(user => plantation ? res.json(plantation) : res.sendStatus(404))
    //     .catch(err => next(err));

    plantationService.getById(req.params.id)
    .then(plantations => res.json([plantations]))
    .catch(err => next(err));
}

function getByPlantation(req, res, next) {
    plantationService.getByPlantation(req.params.plantation_id)
        .then(user => plantation ? res.json(plantation) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    plantationService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {

    console.log("NANDITO");
    plantationService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}