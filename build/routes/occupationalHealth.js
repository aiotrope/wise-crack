"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const occupationalHealth_1 = tslib_1.__importDefault(require("../services/occupationalHealth"));
const router = express_1.default.Router();
router.get('/', occupationalHealth_1.default.getAllOCH);
router.post('/:id', occupationalHealth_1.default.addOCH);
exports.default = router;
//# sourceMappingURL=occupationalHealth.js.map