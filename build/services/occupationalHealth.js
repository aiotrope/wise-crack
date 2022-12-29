"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const joi_1 = tslib_1.__importDefault(require("joi"));
const index_1 = require("../models/index");
const logger_1 = tslib_1.__importDefault(require("../utils/logger"));
const getAllOCH = async (_req, res) => {
    const och = await index_1.OHCModel.find({}).populate('diagnosisCodes', { __v: 0 });
    if (!och)
        throw Error('Problem fetching patients list!');
    return res.status(200).json(och);
};
const addOCH = async (req, res) => {
    const id = req.params.id;
    const patient = await index_1.PatientModel.findById(id);
    const schema = joi_1.default.object().keys({
        description: joi_1.default.string().required().trim(),
        specialist: joi_1.default.string().required().trim(),
        type: joi_1.default.string().default(index_1.EntryType.OccupationalHealthcare),
        diagnose: joi_1.default.string().required().trim(),
        date: joi_1.default.date().required(),
        employerName: joi_1.default.string().required().trim(),
        sickLeave: joi_1.default.optional(),
        diagnosisCodes: joi_1.default.array(),
    });
    const response = schema.validate(req.body);
    if (response.error) {
        logger_1.default.error(response.error.details);
        throw Error(`${response.error.details[0].message}`);
    }
    if (!patient)
        throw Error(`Patient with ${id} is not in the record!`);
    const diagnose = await index_1.DiagnoseModel.findOne({
        _id: req.body.diagnose,
    });
    if (!diagnose)
        throw Error(`${req.body.diagnose} diagnose does not exist!`);
    try {
        const diagnoseObj = {
            id: diagnose._id,
            code: diagnose.code,
            name: diagnose.name,
            latin: diagnose.latin,
        };
        const data = {
            description: response.value.description,
            specialist: response.value.specialist,
            type: response.value.type,
            date: response.value.date,
            diagnose: response.value.diagnose,
            diagnosisCodes: diagnoseObj,
            employerName: response.value.employerName,
            sickLeave: response.value.sickLeave,
        };
        const ohc = new index_1.OHCModel(data);
        patient.entries.unshift(ohc);
        await patient.save();
        await ohc.save();
        return res.status(201).json(ohc);
    }
    catch (error) {
        if (error instanceof Error) {
            throw Error(`${error.message}`);
        }
    }
};
exports.default = {
    getAllOCH,
    addOCH,
};
//# sourceMappingURL=occupationalHealth.js.map