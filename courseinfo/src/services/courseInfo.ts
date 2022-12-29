import axios from 'axios'

const baseUrl = process.env.REACT_APP_BASE_URL

const getAll = async () => {
  const response = await axios.get(`${baseUrl}/courseParts`)
  return response.data
}

const courseInfoService = {
  getAll,
}

export default courseInfoService
