const express = require('express');
const router = express.Router();
const farmerAssociationService = require('./farmer_association.service');

// routes
// router.post('/authenticate', authenticate);
router.post('/create', addFarmerAssociation);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

// function authenticate(req, res, next) {
//     farmerAssociationService.authenticate(req.body)
//         .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
//         .catch(err => next(err));
// }

function addFarmerAssociation(req, res, next) {
    farmerAssociationService.create(req.body)
        .then(() => res.json({ message: 'Farmers Association successfully added.' }))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    console.log("HUH");
    farmerAssociationService.getAll()
        .then(farmerAssociations => res.json(farmerAssociations))
        .catch(err => next(err));
}

function getById(req, res, next) {
    farmerAssociationService.getById(req.params.id)
        .then(user => farmerAssociation ? res.json(farmerAssociation) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    farmerAssociationService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {

    console.log("NANDITO");
    farmerAssociationService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}