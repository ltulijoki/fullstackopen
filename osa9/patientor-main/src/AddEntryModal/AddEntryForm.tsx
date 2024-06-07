import { Field, Form, Formik } from 'formik';
import { EntryType } from '../types';
import { Grid, Button, Typography } from '@material-ui/core';
import { DiagnosisSelection, NumberField, SelectField, TextField, TypeOption } from '../AddPatientModal/FormField';
import { useStateValue } from '../state';

export type EntryFormValues = {
  type: EntryType,
  description: string,
  date: string,
  specialist: string,
  diagnosisCodes: string[],
  dischargeDate: string,
  dischargeCriteria: string,
  employerName: string,
  sickLeaveStart: string,
  sickLeaveEnd: string,
  healthCheckRating: number
};

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const typeOptions: TypeOption[] = [
  { value: EntryType.Hospital, label: 'Hospital' },
  { value: EntryType.OccupationalHealthcare, label: 'Occupational Healthcare' },
  { value: EntryType.HealthCheck, label: 'Health Check' }
];

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        type: EntryType.Hospital,
        description: '',
        date: '',
        specialist: '',
        diagnosisCodes: [],
        dischargeDate: '',
        dischargeCriteria: '',
        employerName: '',
        sickLeaveStart: '',
        sickLeaveEnd: '',
        healthCheckRating: NaN
      }}
      onSubmit={onSubmit}
      validate={values => {
        values.healthCheckRating = (document.getElementsByName('healthCheckRating')[0] as HTMLInputElement).valueAsNumber;
        const requiredError = 'Field is required';
        const errors: { [field: string]: string } = {};

        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        } else if (!Date.parse(values.date)) {
          errors.date = 'Invalid date';
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }

        if (values.type === EntryType.Hospital) {
          if (!values.dischargeDate) {
            errors.dischargeDate = requiredError;
          } else if (!Date.parse(values.dischargeDate)) {
            errors.dischargeDate = 'Invalid date';
          }
          if (!values.dischargeCriteria) {
            errors.dischargeCriteria = requiredError;
          }
        }

        if (values.type === EntryType.OccupationalHealthcare) {
          if (!values.employerName) {
            errors.employerName = requiredError;
          }
          if (values.sickLeaveStart && !Date.parse(values.sickLeaveStart)) {
            errors.sickLeaveStart = 'Invalid date';
          }
          if (values.sickLeaveEnd && !Date.parse(values.sickLeaveEnd)) {
            errors.sickLeaveEnd = 'Invalid date';
          }
        }

        if (values.type === EntryType.HealthCheck && isNaN(values.healthCheckRating)) {
          errors.healthCheckRating = requiredError;
        }

        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        return (
          <Form className="form ui">
            <SelectField
              label="Type"
              name="type"
              options={typeOptions}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="Date"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            {values.type === EntryType.Hospital && <>
              <Typography variant="h6" style={{ fontWeight: 'bold' }}>Discharge</Typography>
              <Field
                label="Date"
                placeholder="Date"
                name="dischargeDate"
                component={TextField}
              />
              <Field
                label="Criteria"
                placeholder="Criteria"
                name="dischargeCriteria"
                component={TextField}
              />
            </>}
            {values.type === EntryType.OccupationalHealthcare && <>
              <Field
                label="Employer name"
                placeholder="Employer name"
                name="employerName"
                component={TextField}
              />
              <Typography variant="h6" style={{ fontWeight: 'bold' }}>Sick Leave</Typography>
              <Field
                label="Start date"
                placeholder="Start date"
                name="sickLeaveStart"
                component={TextField}
              />
              <Field
                label="End date"
                placeholder="End date"
                name="sickLeaveEnd"
                component={TextField}
              />
            </>}
            {values.type === EntryType.HealthCheck && <>
              <Field
                label="Health check rating"
                name="healthCheckRating"
                component={NumberField}
                min={0}
                max={3}
              />
              0 Healthy
              <br />
              1 Low risk
              <br />
              2 High risk
              <br />
              3 Critical risk
            </>}
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: 'left' }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{ float: 'right' }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;