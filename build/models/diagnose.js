"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const DiagnoseSchema = new mongoose_1.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    name: {
        type: String,
        trim: true,
        unique: true,
    },
    latin: {
        type: String,
    },
});
DiagnoseSchema.virtual('id').get(function () {
    return this._id.toHexString();
});
DiagnoseSchema.set('toJSON', {
    virtuals: true,
    transform: (_document, retObj) => {
        delete retObj.__v;
    },
});
const DiagnoseModel = (0, mongoose_1.model)('DiagnoseModel', DiagnoseSchema);
exports.default = DiagnoseModel;
//# sourceMappingURL=diagnose.js.map