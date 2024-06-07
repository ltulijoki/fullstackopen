import express from 'express';
import patientService from '../services/patientService';
import { Patient } from '../types';
import utils from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPublicPatients());
});

router.get('/:id', (req, res) => {
  const patient: Patient | undefined = patientService.getPatientById(req.params.id);
  if (patient) res.send(patient);
  else res.sendStatus(404);
});

router.post('/', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatient = utils.toNewPatient(req.body);
    const added = patientService.addPatient(newPatient);
    res.json(added);
  } catch (error: unknown) {
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
    const newEntry = utils.toNewEntry(req.body);
    const added = patientService.addEntry(req.params.id, newEntry);
    res.json(added);
  } catch (error: unknown) {
    let message = 'Something went wrong.';
    if (error instanceof Error) {
      message += ' Error: ' + error.message;
    }
    res.status(400).send(message);
  }
});

export default router;