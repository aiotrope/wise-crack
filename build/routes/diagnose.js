"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const diagnose_1 = tslib_1.__importDefault(require("../services/diagnose"));
const router = express_1.default.Router();
router.get('/', diagnose_1.default.getAllDiagnoses);
router.post('/', diagnose_1.default.addDiagnose);
exports.default = router;
//# sourceMappingURL=diagnose.js.map