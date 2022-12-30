const calculateExercises = (
  one: number,
  two: number,
  three: number,
  four: number,
  five: number,
  six: number,
  seven: number
) => {
  const arr = [one, two, three, four, five, six, seven]
  let count = 0

  for (let i = 0; i < arr.length; ++i) {
    if (arr[i] !== 0) count++
  }

  const total = arr.reduce(function (a, b) {
    return +a + +b
  })
  return {
    periodLength: arr.length,
    trainingDays: count,
    rating: 2,
    ratingDescription: 'not too bad but could be better',
    target: 2,
    average: total / arr.length,
  }
}

const one = Number(process.argv[2])
const two = Number(process.argv[3])
const three = Number(process.argv[4])
const four = Number(process.argv[5])
const five = Number(process.argv[6])
const six = Number(process.argv[7])
const seven = Number(process.argv[8])

console.log(calculateExercises(one, two, three, four, five, six, seven))
