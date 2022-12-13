import dotenv from 'dotenv'

dotenv.config()

const DATABASE_URI_DEV = process.env.DATABASE_URI_DEV || ''
const PORT = process.env.PORT || ''

const config = {
  database_uri_dev: DATABASE_URI_DEV,
  port: PORT,
}

export default config
