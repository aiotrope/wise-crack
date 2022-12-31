import express, { Request, Response } from 'express'
import axios from 'axios'
import { calculateBmi } from './bmiCalculator'

const app = express()

app.use(express.json())

app.use(express.urlencoded({ extended: false }))

interface BMIResponse {
  height: number
  weight: number
  bmi: string | undefined
}

app.get('/ping', (_req: Request, res: Response) => {
  res.send('pong')
})

app.get('*', (req, res) => {
  req.query
  const height = Number(req.query.height)
  const weight = Number(req.query.weight)
  const result = calculateBmi(height, weight)
  const obj: BMIResponse = { height: height, weight: weight, bmi: result }
  res.status(200).json(obj)
})

app.post('/calculate', (req: Request, res: Response) => {
  const height = Number(req.body.height)
  const weight = Number(req.body.weight)
  const result = calculateBmi(height, weight)
  const obj: BMIResponse = { height: height, weight: weight, bmi: result }

  res.status(201).json(obj)
})

const bmiRes = async () => {
  let height
  let weight
  const querystring = `bmi?height=${height}&weight=${weight}`
  const { data: response } = await axios.get(
    'http://localhost:3002/' + querystring
  )
  return response
}

bmiRes

const PORT = 3002

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
