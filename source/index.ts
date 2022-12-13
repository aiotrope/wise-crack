import * as http from 'http'
import config from './utils/config'
import app from './app'
import logger from './utils/logger'

const server = http.createServer(app)

server.listen(config.port, () => {
  logger.info(`Server is running on port ${config.port}`)
})
