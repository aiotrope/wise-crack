"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const cookie_parser_1 = tslib_1.__importDefault(require("cookie-parser"));
const helmet_1 = tslib_1.__importDefault(require("helmet"));
const cors_1 = tslib_1.__importDefault(require("cors"));
const db_1 = tslib_1.__importDefault(require("./utils/db"));
const middleware_1 = tslib_1.__importDefault(require("./utils/middleware"));
const logger_1 = require("./utils/logger");
const ping_1 = tslib_1.__importDefault(require("./routes/ping"));
const patient_1 = tslib_1.__importDefault(require("./routes/patient"));
const diagnose_1 = tslib_1.__importDefault(require("./routes/diagnose"));
require('express-async-errors');
const app = (0, express_1.default)();
(0, db_1.default)();
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
app.use(express_1.default.static('build'));
app.use((0, helmet_1.default)());
app.use(require('sanitize').middleware);
app.use(logger_1.morganMiddleware);
app.use('/api/ping', ping_1.default);
app.use('/api/patients', patient_1.default);
app.use('/api/diagnoses', diagnose_1.default);
app.use(middleware_1.default.endPoint404);
app.use(middleware_1.default.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map