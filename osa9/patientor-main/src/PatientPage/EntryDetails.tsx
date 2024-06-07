import { Entry, EntryType, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from '../types';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import WorkIcon from '@mui/icons-material/Work';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import { withStyles } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import FavoriteIcon from '@material-ui/icons/Favorite';

const entryStyle = {
  border: '2px solid black',
  borderRadius: 5,
  margin: '20px 0'
};

const colors = [
  '#008000',
  '#ffff00',
  '#ff0000',
  '#8b0000'
];

const getHealthRatingIcon = (rating: number) => withStyles({
  iconFilled: {
    color: colors[rating]
  }
})(Rating);

const Hospital = ({ entry }: { entry: HospitalEntry }) => {
  return (
    <div style={entryStyle}>
      <div>
        {entry.date}
        <LocalHospitalIcon />
      </div>
      <div>
        <i>{entry.description}</i>
      </div>
      <div>
        diagnose by {entry.specialist}
      </div>
    </div>
  );
};

const OccupationalHealthcare = ({ entry }: { entry: OccupationalHealthcareEntry }) => {
  return (
    <div style={entryStyle}>
      <div>
        {entry.date}
        <WorkIcon />
        <i>{entry.employerName}</i>
      </div>
      <div>
        <i>{entry.description}</i>
      </div>
      <div>
        diagnose by {entry.specialist}
      </div>
    </div>
  );
};

const HealthCheck = ({ entry }: { entry: HealthCheckEntry }) => {
  const HealthRatingIcon = getHealthRatingIcon(entry.healthCheckRating);

  return (
    <div style={entryStyle}>
      <div>
        {entry.date}
        <MedicalServicesIcon />
      </div>
      <div>
        <i>{entry.description}</i>
      </div>
      <div>
        <HealthRatingIcon
          readOnly
          value={1}
          max={1}
          icon={<FavoriteIcon fontSize="inherit" />}
        />
      </div>
    </div>
  );
};

const assertNever = (value: never): never => {
  throw new Error('ERROR: ' + JSON.stringify(value));
};

const EntryDetails = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case EntryType.Hospital:
      return <Hospital entry={entry} />;
    case EntryType.OccupationalHealthcare:
      return <OccupationalHealthcare entry={entry} />;
    case EntryType.HealthCheck:
      return <HealthCheck entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;