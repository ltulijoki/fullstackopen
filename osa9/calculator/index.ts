import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const params = req.query;
  const height = Number(params.height);
  const weight = Number(params.weight);
  if (isNaN(height) || isNaN(weight)) {

    return res.status(400).send({ error: "malformatted parameters" });
  }
  return res.send({
    height,
    weight,
    bmi: calculateBmi(height, weight)
  });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  if (!daily_exercises || !target) {
    return res.status(400).send({ error: "parameters missing" });
  }
  if (!Array.isArray(daily_exercises) || !Number.isFinite(target)) {
    return res.status(400).send({ error: "malformatted parameters" });
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return res.send(calculateExercises(daily_exercises, target));
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});