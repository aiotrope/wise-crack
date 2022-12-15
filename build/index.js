"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const http = tslib_1.__importStar(require("http"));
const config_1 = tslib_1.__importDefault(require("./utils/config"));
const app_1 = tslib_1.__importDefault(require("./app"));
const logger_1 = tslib_1.__importDefault(require("./utils/logger"));
const server = http.createServer(app_1.default);
const port = config_1.default.port;
server.listen(port, () => {
    logger_1.default.info(`Server is running on port ${port}`);
});
//# sourceMappingURL=index.js.map