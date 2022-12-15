"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Diagnose = void 0;
const tslib_1 = require("tslib");
const typegoose_1 = require("@typegoose/typegoose");
let Diagnose = class Diagnose {
};
tslib_1.__decorate([
    (0, typegoose_1.prop)({ required: true, unique: true }),
    tslib_1.__metadata("design:type", String)
], Diagnose.prototype, "code", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ required: true, unique: true }),
    tslib_1.__metadata("design:type", String)
], Diagnose.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)(),
    tslib_1.__metadata("design:type", String)
], Diagnose.prototype, "latin", void 0);
Diagnose = tslib_1.__decorate([
    (0, typegoose_1.modelOptions)({
        schemaOptions: {
            toJSON: {
                virtuals: true,
                transform: (_document, retObj) => {
                    delete retObj.__v;
                },
            },
        },
    })
], Diagnose);
exports.Diagnose = Diagnose;
const DiagnoseModel = (0, typegoose_1.getModelForClass)(Diagnose);
exports.default = DiagnoseModel;
//# sourceMappingURL=diagnose.js.map