"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const patient_1 = tslib_1.__importDefault(require("../services/patient"));
const router = express_1.default.Router();
router.get('/', patient_1.default.getAllPatients);
router.get('/non-confidential', patient_1.default.getNonConfidentialInfo);
router.post('/', patient_1.default.addPatient);
exports.default = router;
//# sourceMappingURL=patient.js.map