"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const joi_1 = tslib_1.__importDefault(require("joi"));
const diagnose_1 = tslib_1.__importDefault(require("../models/diagnose"));
//import { HydratedDocument } from 'mongoose'
const http_errors_1 = tslib_1.__importDefault(require("http-errors"));
const logger_1 = tslib_1.__importDefault(require("../utils/logger"));
const getAllDiagnoses = (_req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const diagnoses = yield diagnose_1.default.find({});
        return res.status(200).json(diagnoses);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        next((0, http_errors_1.default)(500, `${error.message}`));
    }
});
const addDiagnose = (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const DiagnoseSchema = joi_1.default.object().keys({
        code: joi_1.default.string().required().trim().min(4).max(5),
        name: joi_1.default.string().required().trim().min(5).max(100),
        latin: joi_1.default.string().optional().allow(''),
    });
    const response = DiagnoseSchema.validate(req.body);
    if (response.error) {
        logger_1.default.error(response.error.details);
        return next((0, http_errors_1.default)(400, `Error: ${response.error.details[0].message}`));
    }
    try {
        const diagnose = yield diagnose_1.default.create(response.value);
        return res.status(201).json(diagnose);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        logger_1.default.warn(error.message);
        if (error.message ===
            `E11000 duplicate key error collection: wiseCrackDB.diagnoses index: name_1 dup key: { name: \"${req.body.name}\" }`) {
            return next((0, http_errors_1.default)(400, `${req.body.name} name is alredy taken!`));
        }
        if (error.message ===
            `E11000 duplicate key error collection: wiseCrackDB.diagnoses index: code_1 dup key: { code: \"${req.body.code}\" }`) {
            return next((0, http_errors_1.default)(400, `${req.body.code} code is alredy taken!`));
        }
        return next((0, http_errors_1.default)(400, `${error.message}`));
    }
});
exports.default = {
    getAllDiagnoses,
    addDiagnose,
};
//# sourceMappingURL=diagnose.js.map