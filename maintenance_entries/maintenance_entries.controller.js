const express = require('express');
const router = express.Router();
const maintenanceService = require('./maintenance_entry.service');

// routes
// router.post('/authenticate', authenticate);
router.post('/create', addMaintenance);
router.get('/', getAll);
router.get('/pending/:id', getAllPending);
router.get('/plantation/:plantation_code', getByPlantation);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

// function authenticate(req, res, next) {
//     maintenanceService.authenticate(req.body)
//         .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
//         .catch(err => next(err));
// }

function addMaintenance(req, res, next) {
    maintenanceService.create(req.body)
        .then(() => res.json({ message: 'Maintenance successfully added.' }))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    console.log("HUH");
    maintenanceService.getAll()
        .then(maintenances => res.json(maintenances))
        .catch(err => next(err));
}

function getAllPending(req, res, next) {
    console.log("HUH");
    maintenanceService.getAllPending(req.params.id)
        .then(maintenances => res.json(maintenances))
        .catch(err => next(err));
}

function getById(req, res, next) {
    maintenanceService.getById(req.params.id)
        .then(user => maintenance ? res.json(maintenance) : res.sendStatus(404))
        .catch(err => next(err));
}

function getByPlantation(req, res, next) {
    maintenanceService.getByPlantation(req.params.plantation_code)
        .then(maintenance => maintenance ? res.json(maintenance) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    maintenanceService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {

    console.log("NANDITO");
    maintenanceService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}