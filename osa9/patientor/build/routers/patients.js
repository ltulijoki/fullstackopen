"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const utils_1 = __importDefault(require("../utils"));
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.send(patientService_1.default.getPublicPatients());
});
router.get('/:id', (req, res) => {
    const patient = patientService_1.default.getPatientById(req.params.id);
    if (patient)
        res.send(patient);
    else
        res.sendStatus(404);
});
router.post('/', (req, res) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const newPatient = utils_1.default.toNewPatient(req.body);
        const added = patientService_1.default.addPatient(newPatient);
        res.json(added);
    }
    catch (error) {
        let message = 'Something went wrong.';
        if (error instanceof Error) {
            message += ' Error: ' + error.message;
        }
        res.status(400).send(message);
    }
});
router.post('/:id/entries', (req, res) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const newEntry = utils_1.default.toNewEntry(req.body);
        const added = patientService_1.default.addEntry(req.params.id, newEntry);
        res.json(added);
    }
    catch (error) {
        let message = 'Something went wrong.';
        if (error instanceof Error) {
            message += ' Error: ' + error.message;
        }
        res.status(400).send(message);
    }
});
exports.default = router;
