import process from 'process'

const args = process.argv

console.log('# of Arguements: ', args.length)

const arr: string[] = []

args.forEach((val) => {
  arr.push(val)
})

const arr1 = arr.splice(0, 2)

console.log(arr1.length)

const arr2: number[] = []

arr.forEach((val) => {
  arr2.push(Number(val))
})

const response = () => {
  let count = 0

  for (let i = 0; i < arr.length; ++i) {
    if (arr2[i] !== 0) count++
  }

  const total = arr2.reduce(function (a, b) {
    return +a + +b
  })

  const average = total / arr2.length

  let description = ''

  if (average < 1) {
    description += 'Keep on moving!'
  }

  if (average > 0.9 && average < 2) {
    description += 'Normal'
  }

  if (average > 1.9 && average < 3) {
    description += 'Optimal'
  }

  if (average > 2.9) {
    description += 'Very Good!'
  }

  return {
    periodLength: arr2.length,
    trainingDays: count,
    rating: 2,
    ratingDescription: description,
    target: 2,
    average: average,
  }
}

console.log(response())
