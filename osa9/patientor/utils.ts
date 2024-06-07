import { Diagnosis, EntryType, EntryWithoutId, Gender, HealthCheckRating, NewPatient } from './types';

const isString = (str: unknown): str is string => {
  return typeof str === 'string' || str instanceof String;
};

const isArray = (arr: unknown): arr is unknown[] => {
  return arr instanceof Array;
};

const isStringArray = (arr: unknown[]): arr is string[] => {
  let toReturn = true;
  arr.forEach(value => {
    if (!isString(value)) {
      toReturn = false;
    }
  });
  return toReturn;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gender: any): gender is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(gender);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntryType = (type: any): type is EntryType => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(EntryType).includes(type);
};

const isDischarge = (dis: unknown): dis is { date: string, criteria: string } => {
  if (!dis || typeof dis !== 'object') return false;
  const keys = Object.keys(dis);
  return keys.includes('date') && keys.includes('criteria');
};

const isSickLeave = (sick: unknown): sick is { startDate: string, endDate: string } => {
  if (!sick || typeof sick !== 'object') return false;
  const keys = Object.keys(sick);
  return keys.includes('startDate') && keys.includes('endDate');
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (rat: any): rat is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(rat);
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date ' + date);
  }
  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn ' + ssn);
  }
  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender ' + gender);
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation ' + occupation);
  }
  return occupation;
};

const parseType = (type: unknown): EntryType => {
  if (!type || !isEntryType(type)) {
    throw new Error('Incorrect or missing type ' + type);
  }
  return type;
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error('Incorrect or missing description ' + description);
  }
  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing specialist ' + specialist);
  }
  return specialist;
};

const parseDiagnosisCodes = (codes: unknown): Diagnosis['code'][] => {
  if (!isArray(codes) || !isStringArray(codes)) {
    throw new Error('Incorrect diagnosis codes ' + codes);
  }
  return codes;
};

const parseDischarge = (discharge: unknown): { date: string, criteria: string } => {
  if (!discharge || !isDischarge(discharge)) {
    throw new Error('Incorrect or missing discharge ' + discharge);
  }
  return discharge;
};

const parseEmpoyerName = (emp: unknown): string => {
  if (!emp || !isString(emp)) {
    throw new Error('Incorrect or missing employer name ' + emp);
  }
  return emp;
};

const parseSickLeave = (sickLeave: unknown): { startDate: string, endDate: string } => {
  if (!sickLeave || !isSickLeave(sickLeave)) {
    throw new Error('Incorrect sick leave');
  }
  return sickLeave;
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (!isHealthCheckRating(rating)) {
    throw new Error('Incorrect or missing health check rating ' + rating);
  }
  return rating;
};

type PatientFields = {
  name: unknown,
  dateOfBirth: unknown,
  ssn: unknown,
  gender: unknown,
  occupation: unknown,
};

type EntryFields = {
  type: unknown,
  description: unknown,
  date: unknown,
  specialist: unknown,
  diagnosisCodes?: unknown,
  discharge?: unknown,
  employerName?: unknown,
  sickLeave?: unknown,
  healthCheckRating?: unknown
};

const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation }: PatientFields): NewPatient => {
  const newPatient = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
  };
  return newPatient;
};

const toNewEntry = ({
  type,
  description,
  date,
  specialist,
  diagnosisCodes,
  discharge,
  employerName,
  sickLeave,
  healthCheckRating
}: EntryFields): EntryWithoutId => {
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
  case EntryType.Hospital:
    return {
      ...newEntry,
      type: EntryType.Hospital,
      discharge: parseDischarge(discharge)
    };

  case EntryType.OccupationalHealthcare:
    return {
      ...newEntry,
      type: EntryType.OccupationalHealthcare,
      employerName: parseEmpoyerName(employerName),
      sickLeave: sickLeave
        ? parseSickLeave(sickLeave)
        : undefined
    };

  case EntryType.HealthCheck:
    return {
      ...newEntry,
      type: EntryType.HealthCheck,
      healthCheckRating: parseHealthCheckRating(healthCheckRating)
    };
  }
};

export default {
  toNewPatient,
  toNewEntry
};