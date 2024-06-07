"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const isString = (str) => {
    return typeof str === 'string' || str instanceof String;
};
const isArray = (arr) => {
    return arr instanceof Array;
};
const isStringArray = (arr) => {
    let toReturn = true;
    arr.forEach(value => {
        if (!isString(value)) {
            toReturn = false;
        }
    });
    return toReturn;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gender) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(types_1.Gender).includes(gender);
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntryType = (type) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(types_1.EntryType).includes(type);
};
const isDischarge = (dis) => {
    if (!dis || typeof dis !== 'object')
        return false;
    const keys = Object.keys(dis);
    return keys.includes('date') && keys.includes('criteria');
};
const isSickLeave = (sick) => {
    if (!sick || typeof sick !== 'object')
        return false;
    const keys = Object.keys(sick);
    return keys.includes('startDate') && keys.includes('endDate');
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (rat) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(types_1.HealthCheckRating).includes(rat);
};
const parseName = (name) => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name');
    }
    return name;
};
const parseDate = (date) => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date ' + date);
    }
    return date;
};
const parseSsn = (ssn) => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn ' + ssn);
    }
    return ssn;
};
const parseGender = (gender) => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender ' + gender);
    }
    return gender;
};
const parseOccupation = (occupation) => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation ' + occupation);
    }
    return occupation;
};
const parseType = (type) => {
    if (!type || !isEntryType(type)) {
        throw new Error('Incorrect or missing type ' + type);
    }
    return type;
};
const parseDescription = (description) => {
    if (!description || !isString(description)) {
        throw new Error('Incorrect or missing description ' + description);
    }
    return description;
};
const parseSpecialist = (specialist) => {
    if (!specialist || !isString(specialist)) {
        throw new Error('Incorrect or missing specialist ' + specialist);
    }
    return specialist;
};
const parseDiagnosisCodes = (codes) => {
    if (!isArray(codes) || !isStringArray(codes)) {
        throw new Error('Incorrect diagnosis codes ' + codes);
    }
    return codes;
};
const parseDischarge = (discharge) => {
    if (!discharge || !isDischarge(discharge)) {
        throw new Error('Incorrect or missing discharge ' + discharge);
    }
    return discharge;
};
const parseEmpoyerName = (emp) => {
    if (!emp || !isString(emp)) {
        throw new Error('Incorrect or missing employer name ' + emp);
    }
    return emp;
};
const parseSickLeave = (sickLeave) => {
    if (!sickLeave || !isSickLeave(sickLeave)) {
        throw new Error('Incorrect sick leave');
    }
    return sickLeave;
};
const parseHealthCheckRating = (rating) => {
    if (!isHealthCheckRating(rating)) {
        throw new Error('Incorrect or missing health check rating ' + rating);
    }
    return rating;
};
const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation }) => {
    const newPatient = {
        name: parseName(name),
        dateOfBirth: parseDate(dateOfBirth),
        ssn: parseSsn(ssn),
        gender: parseGender(gender),
        occupation: parseOccupation(occupation),
    };
    return newPatient;
};
const toNewEntry = ({ type, description, date, specialist, diagnosisCodes, discharge, employerName, sickLeave, healthCheckRating }) => {
    const parsedType = parseType(type);
    const newEntry = {
        description: parseDescription(description),
        date: parseDate(date),
        specialist: parseSpecialist(specialist),
        diagnosisCodes: diagnosisCodes
            ? parseDiagnosisCodes(diagnosisCodes)
            : undefined
    };
    switch (parsedType) {
        case types_1.EntryType.Hospital:
            return Object.assign(Object.assign({}, newEntry), { type: types_1.EntryType.Hospital, discharge: parseDischarge(discharge) });
        case types_1.EntryType.OccupationalHealthcare:
            return Object.assign(Object.assign({}, newEntry), { type: types_1.EntryType.OccupationalHealthcare, employerName: parseEmpoyerName(employerName), sickLeave: sickLeave
                    ? parseSickLeave(sickLeave)
                    : undefined });
        case types_1.EntryType.HealthCheck:
            return Object.assign(Object.assign({}, newEntry), { type: types_1.EntryType.HealthCheck, healthCheckRating: parseHealthCheckRating(healthCheckRating) });
    }
};
exports.default = {
    toNewPatient,
    toNewEntry
};
