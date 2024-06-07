"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const patients_1 = __importDefault(require("../data/patients"));
const getPatients = () => {
    return patients_1.default;
};
const getPublicPatients = () => {
    return patients_1.default.map(p => { return Object.assign(Object.assign({}, p), { ssn: undefined }); });
};
const getPatientById = (id) => {
    return patients_1.default.find(p => p.id === id);
};
const addPatient = (patient) => {
    const newPatient = Object.assign({ id: (0, uuid_1.v1)(), entries: [] }, patient);
    patients_1.default.push(newPatient);
    return newPatient;
};
const addEntry = (patientId, entry) => {
    const newEntry = Object.assign({ id: (0, uuid_1.v1)() }, entry);
    patients_1.default.forEach(p => {
        if (p.id === patientId)
            p.entries.push(newEntry);
    });
    return newEntry;
};
exports.default = {
    getPatients,
    getPublicPatients,
    getPatientById,
    addPatient,
    addEntry
};
