"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const http_errors_1 = tslib_1.__importDefault(require("http-errors"));
const endPoint404 = (_req, _res, next) => {
    next((0, http_errors_1.default)(404));
};
const errorHandler = (error, req, res, next) => {
    res.locals.message = error.message;
    res.locals.error = req.app.get('env') === 'development' ? error : {};
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    res.status(error.status || 500).json({ error: res.locals.message });
    next(error);
};
const middlewares = {
    errorHandler,
    endPoint404,
};
exports.default = middlewares;
//# sourceMappingURL=middleware.js.map