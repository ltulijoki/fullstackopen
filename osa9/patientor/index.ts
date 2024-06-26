import express from 'express';
import cors from 'cors';
import diagnoseRouter from './routers/diagnoses';
import patientRouter from './routers/patients';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

app.use('/api/diagnoses', diagnoseRouter);
app.use('/api/patients', patientRouter);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});