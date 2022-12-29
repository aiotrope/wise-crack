"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const joi_1 = tslib_1.__importDefault(require("joi"));
const index_1 = require("../models/index");
const logger_1 = tslib_1.__importDefault(require("../utils/logger"));
const getAllHopitalEntries = async (_req, res) => {
    const entry = await index_1.HospitalEntryModel.find({});
    if (!entry)
        throw Error('Problem fetching hospital entry list!');
    return res.status(200).json(entry);
};
const addHospitalEntry = async (req, res) => {
    const id = req.params.id;
    const patient = await index_1.PatientModel.findById(id);
    const schema = joi_1.default.object().keys({
        description: joi_1.default.string().required().trim(),
        specialist: joi_1.default.string().required().trim(),
        type: joi_1.default.string().default(index_1.EntryType.Hospital),
        diagnose: joi_1.default.string().required().trim(),
        date: joi_1.default.date().required(),
        diagnosisCodes: joi_1.default.array(),
        discharge: joi_1.default.optional(),
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
            discharge: response.value.discharge,
        };
        const hospitalEntry = new index_1.HospitalEntryModel(data);
        patient.entries.unshift(hospitalEntry);
        await patient.save();
        await hospitalEntry.save();
        return res.status(201).json(hospitalEntry);
    }
    catch (error) {
        if (error instanceof Error) {
            throw Error(`${error.message}`);
        }
    }
};
exports.default = {
    getAllHopitalEntries,
    addHospitalEntry,
};
//# sourceMappingURL=hospital.js.map