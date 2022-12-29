"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
dotenv_1.default.config();
const DATABASE_URI_DEV = process.env.DATABASE_URI_DEV || '';
const DATABASE_URI_PROD = process.env.DATABASE_URI_PROD || '';
const PORT = process.env.PORT || '';
const DB_NAME = process.env.DB_NAME || '';
const config = {
    database_uri_dev: DATABASE_URI_DEV,
    database_uri_prod: DATABASE_URI_PROD,
    port: PORT,
    db_name: DB_NAME,
};
exports.default = config;
//# sourceMappingURL=config.js.map