const calculateBmi = (height: number, weight: number): string => {
  const bmi: number = weight / (height / 100) ** 2;
  if (bmi < 16.0) return 'Underweight (Severe thinness)';
  if (bmi < 17.0) return 'Underweight (Moderate thinness)';
  if (bmi < 18.5) return 'Underweight (Mild thinness)';
  if (bmi < 25.0) return 'Normal (healthy weight)';
  if (bmi < 30.0) return 'Overweight (Pre-obese)';
  if (bmi < 35.0) return 'Obese (Class I)';
  if (bmi < 40.0) return 'Obese (Class II)';
  return 'Obese (Class III)';
}

if (require.main === module) {
  if (process.argv.length !== 4) {
    console.log('give 2 arguments');
    process.exit()
  }
  if (isNaN(Number(process.argv[2])) || isNaN(Number(process.argv[3]))) {
    console.log('arguments must be numbers');
    process.exit()
  }
  console.log(calculateBmi(Number(process.argv[2]), Number(process.argv[3])));
}

export default calculateBmi;