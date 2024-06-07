interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (exerciseHours: Array<number>, target: number): Result => {
  const periodLength: number = exerciseHours.length;
  const sum: number = exerciseHours.reduce((prev, curr) => prev + curr, 0);
  const average: number = sum / periodLength;
  let rating: number;
  let ratingDescription: string;
  if (average > target) {
    rating = 3;
    ratingDescription = 'good';
  }
  else if (average < target / 2) {
    rating = 1;
    ratingDescription = 'bad';
  }
  else {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  }
  return {
    periodLength,
    trainingDays: exerciseHours.filter(h => h > 0).length,
    success: average >= target,
    rating,
    ratingDescription,
    target,
    average
  };
};

if (require.main === module) {
  if (process.argv.length < 4) {
    console.log('give target and hours');
    process.exit();
  }
  const target = Number(process.argv[2]);
  if (isNaN(target)) {
    console.log('target is not a number');
    process.exit();
  }
  const hours: Array<number> = [];
  for (let i = 3; i < process.argv.length; i++) {
    if (isNaN(Number(process.argv[i]))) {
      console.log(`${process.argv[i]} is not a number`);
      process.exit();
    }
    hours.push(Number(process.argv[i]));
  }
  console.log(calculateExercises(hours, target));
}

export default calculateExercises;