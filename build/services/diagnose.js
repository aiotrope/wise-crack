"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const z = tslib_1.__importStar(require("zod"));
const zod_validation_error_1 = require("zod-validation-error");
const index_1 = require("../models/index");
//import logger from '../utils/logger'
const getAllDiagnoses = async (_req, res) => {
    const diagnoses = await index_1.DiagnoseModel.find({});
    if (!diagnoses)
        throw Error('Problem fetching diagnose list!');
    return res.status(200).json(diagnoses);
};
const addDiagnose = async (req, res) => {
    const schema1 = z.object({
        code: z.string().trim().min(4).max(6),
        name: z.string().trim().min(5).max(200),
        latin: z.string().optional(),
    });
    try {
        const response = schema1.safeParse(req.body);
        if (!response.success) {
            throw Error(String(response.error));
        }
        const diagnose = await index_1.DiagnoseModel.create(response.data);
        return res.status(201).json(diagnose);
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
    getAllDiagnoses,
    addDiagnose,
};
//# sourceMappingURL=diagnose.js.map