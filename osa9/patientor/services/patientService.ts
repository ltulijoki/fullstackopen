import { v1 as uuid } from 'uuid';
import patients from '../data/patients';
import { Patient, PublicPatient, NewPatient, EntryWithoutId, Entry } from '../types';

const getPatients = (): Patient[] => {
  return patients;
};

const getPublicPatients = (): PublicPatient[] => {
  return patients.map(p => { return { ...p, ssn: undefined }; });
};

const getPatientById = (id: string): Patient | undefined => {
  return patients.find(p => p.id === id);
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    entries: [],
    ...patient,
  };
  patients.push(newPatient);
  return newPatient;
};

const addEntry = (patientId: Patient['id'], entry: EntryWithoutId): Entry => {
  const newEntry = {
    id: uuid(),
    ...entry
  };
  patients.forEach(p => {
    if (p.id === patientId)
      p.entries.push(newEntry);
  });
  return newEntry;
};

export default {
  getPatients,
  getPublicPatients,
  getPatientById,
  addPatient,
  addEntry
};