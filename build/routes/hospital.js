"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const hospital_1 = tslib_1.__importDefault(require("../services/hospital"));
const router = express_1.default.Router();
router.get('/', hospital_1.default.getAllHopitalEntries);
router.post('/:id', hospital_1.default.addHospitalEntry);
exports.default = router;
//# sourceMappingURL=hospital.js.map