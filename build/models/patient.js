"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Patient = void 0;
const tslib_1 = require("tslib");
const typegoose_1 = require("@typegoose/typegoose");
let Patient = class Patient {
};
tslib_1.__decorate([
    (0, typegoose_1.prop)({ required: true, unique: true, trim: true }),
    tslib_1.__metadata("design:type", String)
], Patient.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ required: true, trim: true }),
    tslib_1.__metadata("design:type", String)
], Patient.prototype, "occupation", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ required: true, trim: true }),
    tslib_1.__metadata("design:type", String)
], Patient.prototype, "dateOfBirth", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({
        required: true,
        enum: ['male', 'female', 'other'],
        trim: true,
    }),
    tslib_1.__metadata("design:type", String)
], Patient.prototype, "gender", void 0);
Patient = tslib_1.__decorate([
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
], Patient);
exports.Patient = Patient;
const PatientModel = (0, typegoose_1.getModelForClass)(Patient);
exports.default = PatientModel;
//# sourceMappingURL=patient.js.map