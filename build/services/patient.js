"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const z = tslib_1.__importStar(require("zod"));
const zod_validation_error_1 = require("zod-validation-error");
const index_1 = require("../models/index");
const logger_1 = tslib_1.__importDefault(require("../utils/logger"));
const getAllPatients = async (_req, res) => {
    const patients = await index_1.PatientModel.find({}).populate('entries');
    if (!patients)
        throw Error('Problem fetching patients list!');
    return res.status(200).json(patients);
};
const getPublicInfo = async (_req, res) => {
    const patients = await index_1.PatientModel.find({}, { ssn: 0 });
    if (!patients)
        throw Error('Problem fetching patients list');
    logger_1.default.warn(patients);
    return res.status(200).json(patients);
};
const getPatientById = async (req, res) => {
    const id = req.params.id;
    const patient = await index_1.PatientModel.findOne({
        _id: id,
    }).populate('entries');
    if (!patient)
        throw Error('Patient with ${id} not found!');
    return res.status(200).json(patient);
};
const addPatient = async (req, res) => {
    const Gender = {
        Male: 'male',
        Female: 'female',
        Other: 'other',
    };
    const schema = z.object({
        name: z.string().trim().min(2).max(30),
        ssn: z.string().trim().min(10).max(14),
        dateOfBirth: z.string().regex(/^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}$/),
        occupation: z.string().trim().min(2).max(30),
        gender: z.nativeEnum(Gender),
        entryType: z.string().optional(),
    });
    try {
        const response = schema.safeParse(req.body);
        if (!response.success) {
            throw Error(String(response.error));
        }
        const patient = new index_1.PatientModel(response.data);
        await patient.save();
        return res.status(201).json(patient);
    }
    catch (error) {
        if (error instanceof Error) {
            throw Error(`${error.message}`);
        }
        else if (error instanceof z.ZodError) {
            const validationError = (0, zod_validation_error_1.fromZodError)(error);
            throw Error(validationError.toString());
        }
    }
};
exports.default = {
    getAllPatients,
    getPublicInfo,
    getPatientById,
    addPatient,
};
//# sourceMappingURL=patient.js.map