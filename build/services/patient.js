"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const joi_1 = tslib_1.__importDefault(require("joi"));
const patient_1 = tslib_1.__importDefault(require("../models/patient"));
const http_errors_1 = tslib_1.__importDefault(require("http-errors"));
const logger_1 = tslib_1.__importDefault(require("../utils/logger"));
const getAllPatients = (_req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const patients = yield patient_1.default.find();
        return res.status(200).json(patients);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        return next((0, http_errors_1.default)(500, `${error.message}`));
    }
});
const getNonConfidentialInfo = (_req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const patients = yield patient_1.default.find({}, { ssn: 0 });
        logger_1.default.warn(patients);
        return res.status(200).json(patients);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        return next((0, http_errors_1.default)(500, `${error.message}`));
    }
});
const addPatient = (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const patientSchema = joi_1.default.object().keys({
        name: joi_1.default.string().required().trim().min(2).max(30),
        occupation: joi_1.default.string().required().trim().min(2).max(30),
        ssn: joi_1.default.string().required().trim().min(10).max(14),
        dateOfBirth: joi_1.default.string().pattern(/^\d\d\d\d\-\d\d\-\d\d$/),
        gender: joi_1.default.string()
            .required()
            .trim()
            .valid('male')
            .valid('female')
            .valid('other'),
    });
    const response = patientSchema.validate(req.body);
    if (response.error) {
        logger_1.default.error(response.error.details);
        return next((0, http_errors_1.default)(400, `Error: ${response.error.details[0].message}`));
    }
    const patient = new patient_1.default(response.value);
    try {
        yield patient.save();
        return res.status(201).json(patient);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        logger_1.default.warn(error.message);
        if (error.message ===
            `E11000 duplicate key error collection: wiseCrackDB.patients index: name_1 dup key: { name: \"${req.body.name}\" }`) {
            return next((0, http_errors_1.default)(400, `${req.body.name} name is alredy taken!`));
        }
        else {
            return next((0, http_errors_1.default)(400, `${error.message}`));
        }
    }
});
exports.default = {
    getAllPatients,
    getNonConfidentialInfo,
    addPatient,
};
//# sourceMappingURL=patient.js.map