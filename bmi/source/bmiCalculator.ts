export const calculateBmi = (height: number, weight: number) => {
  let convertedToMeter = height / 100
  const squareOfHeight = (convertedToMeter **= 2)
  const bmi = (weight / squareOfHeight).toFixed(1)
  const sample = Number(bmi)
  if (sample < 18.5) return 'Underweight'
  if (sample > 18.4 && sample < 25) return 'Normal (healthy weight)'
  if (sample > 24.9 && sample < 30) return 'Overweight'
  if (sample > 29.9) return 'Obese'
}

const heightArg = Number(process.argv[2])
const weightArg = Number(process.argv[3])
const bmi = calculateBmi(heightArg, weightArg)

console.log(bmi)

//export default calculateBmi
