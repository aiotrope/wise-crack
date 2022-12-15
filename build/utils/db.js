"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const config_1 = tslib_1.__importDefault(require("./config"));
const logger_1 = tslib_1.__importDefault(require("./logger"));
let dbURL;
const opts = {
    autoIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
const dbConnection = () => {
    mongoose_1.default.set('strictQuery', false);
    if (process.env.NODE_ENV === 'development') {
        dbURL = config_1.default.database_uri_dev;
    }
    if (process.env.NODE_ENV === 'production') {
        dbURL = config_1.default.database_uri_prod;
    }
    mongoose_1.default.connect(dbURL, opts);
    const db = mongoose_1.default.connection;
    db.once('open', () => {
        logger_1.default.debug(`Database connected: ${dbURL}`);
    });
    db.on('error', (error) => {
        logger_1.default.error(`connection error: ${error}`);
    });
};
exports.default = dbConnection;
//# sourceMappingURL=db.js.map