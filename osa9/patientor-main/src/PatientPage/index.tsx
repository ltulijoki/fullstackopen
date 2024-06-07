import { Typography, Button } from '@material-ui/core';
import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from '../constants';
import { Entry, Patient } from '../types';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import EntryDetails from './EntryDetails';
import AddEntryModal from '../AddEntryModal';
import { EntryFormValues } from '../AddEntryModal/AddEntryForm';

const icons = {
  male: <MaleIcon />,
  female: <FemaleIcon />,
  other: <TransgenderIcon />,
};

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = React.useState<Patient | undefined>();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitEntry = async (values: EntryFormValues) => {
    if (!id) return;
    try {
      const toSubmit = {
        type: values.type,
        description: values.description,
        date: values.date,
        specialist: values.specialist,
        diagnosisCodes: values.diagnosisCodes,
        discharge: { date: values.dischargeDate, criteria: values.dischargeCriteria },
        employerName: values.employerName,
        sickLeave: { startDate: values.sickLeaveStart, endDate: values.sickLeaveEnd },
        healthCheckRating: values.healthCheckRating
      };
      await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        toSubmit
      );
      closeModal();
      axios.get<Patient>(`${apiBaseUrl}/patients/${id}`)
        .then(res => setPatient(res.data))
        .catch(_e => { return; });
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || 'Unrecognized axios error');
        
      }
    }
  };

  React.useEffect(() => {
    if (!id) return;
    axios.get<Patient>(`${apiBaseUrl}/patients/${id}`)
      .then(res => setPatient(res.data))
      .catch(_e => { return; });
  }, [id]);

  if (patient === undefined) return <div />;

  return (
    <div className="App">
      <Typography variant="h5" style={{ fontWeight: 'bold' }}>
        {patient.name}
        {icons[patient.gender]}
      </Typography>
      <p>
        ssn: {patient.ssn}
        <br />
        occupation: {patient.occupation}
      </p>
      <Typography variant="h6" style={{ fontWeight: 'bold' }}>entries</Typography>
      {patient.entries.map(entry =>
        <EntryDetails entry={entry} key={entry.description} />
      )}
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitEntry}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" color="primary" onClick={openModal}>Add New Entry</Button>
    </div>
  );
};

export default PatientPage;