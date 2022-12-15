"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.status(200).json('pong!');
});
exports.default = router;
//# sourceMappingURL=ping.js.map