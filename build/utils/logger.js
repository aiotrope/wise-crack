"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.morganMiddleware = void 0;
const tslib_1 = require("tslib");
const winston_1 = tslib_1.__importDefault(require("winston"));
const morgan_1 = tslib_1.__importDefault(require("morgan"));
const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};
const level = () => {
    const env = process.env.NODE_ENV || 'development';
    const isDevelopment = env === 'development';
    return isDevelopment ? 'debug' : 'warn';
};
const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white',
};
winston_1.default.addColors(colors);
const format = winston_1.default.format.combine(winston_1.default.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }), winston_1.default.format.colorize({ all: true }), winston_1.default.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`));
const transports = [new winston_1.default.transports.Console()];
const logger = winston_1.default.createLogger({
    level: level(),
    levels,
    format,
    transports,
});
const stream = {
    write: (message) => logger.http(message),
};
const skip = () => {
    const env = process.env.NODE_ENV || 'development';
    return env !== 'development';
};
exports.morganMiddleware = (0, morgan_1.default)(':remote-addr :method :url :status :res[content-length] - :response-time ms', { stream, skip });
exports.default = logger;
//# sourceMappingURL=logger.js.map