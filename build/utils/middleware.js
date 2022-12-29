"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const config_1 = tslib_1.__importDefault(require("./config"));
const http_errors_1 = tslib_1.__importDefault(require("http-errors"));
//import logger from './logger'
const endPoint404 = (_req, _res, next) => {
    next((0, http_errors_1.default)(404));
};
const errorHandler = (error, req, res, next) => {
    //logger.warn(error.message)
    if (error.message ===
        `E11000 duplicate key error collection: ${config_1.default.db_name}.patients index: name_1 dup key: { name: "${req.body.name}" }`) {
        return res
            .status(400)
            .json({ error: `${req.body.name} patient name is already been taken!` });
    }
    if (error.message ===
        `E11000 duplicate key error collection: ${config_1.default.db_name}.diagnoses index: name_1 dup key: { name: "${req.body.name}" }`) {
        return res
            .status(400)
            .json({ error: `${req.body.name} diagnoses name is alredy taken!` });
    }
    if (error.message ===
        `E11000 duplicate key error collection: ${config_1.default.db_name}.diagnoses index: code_1 dup key: { code: "${req.body.code}" }`) {
        return res
            .status(400)
            .json({ error: `${req.body.code} code is alredy taken!` });
    }
    if (error.message === 'Problem fetching patients list!') {
        return res.status(400).json({ error: error.message });
    }
    if (error.message === 'Problem fetching diagnoses list!') {
        return res.status(400).json({ error: error.message });
    }
    if (error.message === '"name" is not allowed to be empty') {
        return res.status(400).json({ error: error.message });
    }
    if (error.message === '"occupation" is not allowed to be empty') {
        return res.status(400).json({ error: error.message });
    }
    if (error.message === '"ssn" is not allowed to be empty') {
        return res.status(400).json({ error: error.message });
    }
    if (error.message === '"dateOfBirth" is not allowed to be empty') {
        return res
            .status(400)
            .json({ error: 'Date of birth is not allowed to empty!' });
    }
    if (error.message === '"gender" must be one of [male, female, other]') {
        return res.status(400).json({ error: error.message });
    }
    next(error);
};
const middlewares = {
    errorHandler,
    endPoint404,
};
exports.default = middlewares;
//# sourceMappingURL=middleware.js.map