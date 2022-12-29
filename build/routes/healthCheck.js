"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const healthCheck_1 = tslib_1.__importDefault(require("../services/healthCheck"));
const router = express_1.default.Router();
router.get('/', healthCheck_1.default.getAllHealthCheck);
router.post('/:id', healthCheck_1.default.addHealthCheck);
exports.default = router;
//# sourceMappingURL=healthCheck.js.map