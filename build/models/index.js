"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientModel = exports.OHCModel = exports.HospitalEntryModel = exports.HealthCheckModel = exports.DiagnoseModel = exports.Patient = exports.OccupationalHealthcare = exports.Hospital = exports.HealthCheck = exports.BaseEntry = exports.Diagnose = exports.EntryType = exports.HealthCheckRating = void 0;
const tslib_1 = require("tslib");
const mongoose = tslib_1.__importStar(require("mongoose"));
const typegoose_1 = require("@typegoose/typegoose");
var HealthCheckRating;
(function (HealthCheckRating) {
    HealthCheckRating[HealthCheckRating["Healthy"] = 0] = "Healthy";
    HealthCheckRating[HealthCheckRating["LowRisk"] = 1] = "LowRisk";
    HealthCheckRating[HealthCheckRating["HighRisk"] = 2] = "HighRisk";
    HealthCheckRating[HealthCheckRating["CriticalRisk"] = 3] = "CriticalRisk";
})(HealthCheckRating = exports.HealthCheckRating || (exports.HealthCheckRating = {}));
var Gender;
(function (Gender) {
    Gender["Male"] = "male";
    Gender["Female"] = "female";
    Gender["Other"] = "other";
})(Gender || (Gender = {}));
var EntryType;
(function (EntryType) {
    EntryType["OccupationalHealthcare"] = "OccupationalHealthcare";
    EntryType["Hospital"] = "Hospital";
    EntryType["HealthCheckEntry"] = "HealthCheck";
})(EntryType = exports.EntryType || (exports.EntryType = {}));
let SickLeave = class SickLeave {
};
tslib_1.__decorate([
    (0, typegoose_1.prop)({ required: true }),
    tslib_1.__metadata("design:type", Date)
], SickLeave.prototype, "startDate", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ required: true }),
    tslib_1.__metadata("design:type", Date)
], SickLeave.prototype, "endDate", void 0);
SickLeave = tslib_1.__decorate([
    (0, typegoose_1.modelOptions)({
        schemaOptions: {
            timestamps: true,
            versionKey: false,
            toObject: {
                virtuals: true,
                transform: (_doc, ret) => {
                    ret.id = ret._id.toString();
                    delete ret._id;
                },
            },
            toJSON: {
                virtuals: true,
                transform: (_doc, ret) => {
                    ret.id = ret._id.toString();
                    delete ret._id;
                },
            },
        },
        options: { allowMixed: typegoose_1.Severity.ALLOW },
    })
], SickLeave);
class Diagnose {
}
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
exports.Diagnose = Diagnose;
let BaseEntry = class BaseEntry {
};
tslib_1.__decorate([
    (0, typegoose_1.prop)({ required: true, trim: true, unique: true }),
    tslib_1.__metadata("design:type", String)
], BaseEntry.prototype, "type", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ required: true, trim: true }),
    tslib_1.__metadata("design:type", String)
], BaseEntry.prototype, "description", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ required: true, trim: true }),
    tslib_1.__metadata("design:type", String)
], BaseEntry.prototype, "specialist", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ required: true }),
    tslib_1.__metadata("design:type", Date)
], BaseEntry.prototype, "date", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ trim: true, required: true }),
    tslib_1.__metadata("design:type", String)
], BaseEntry.prototype, "diagnose", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ required: true, default: [] }),
    tslib_1.__metadata("design:type", Array)
], BaseEntry.prototype, "diagnosisCodes", void 0);
BaseEntry = tslib_1.__decorate([
    (0, typegoose_1.modelOptions)({
        schemaOptions: {
            timestamps: true,
            versionKey: false,
            toObject: {
                virtuals: true,
                transform: (_doc, ret) => {
                    ret.id = ret._id.toString();
                    delete ret._id;
                },
            },
            toJSON: {
                virtuals: true,
                transform: (_doc, ret) => {
                    ret.id = ret._id.toString();
                    delete ret._id;
                },
            },
        },
        options: { allowMixed: typegoose_1.Severity.ALLOW },
    })
], BaseEntry);
exports.BaseEntry = BaseEntry;
class HealthCheck extends BaseEntry {
}
tslib_1.__decorate([
    (0, typegoose_1.prop)({ required: true, trim: true, default: EntryType.HealthCheckEntry }),
    tslib_1.__metadata("design:type", String)
], HealthCheck.prototype, "type", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({
        required: true,
        enum: HealthCheckRating,
        default: HealthCheckRating.Healthy,
    }),
    tslib_1.__metadata("design:type", Number)
], HealthCheck.prototype, "healthCheckRating", void 0);
exports.HealthCheck = HealthCheck;
class Discharge {
}
tslib_1.__decorate([
    (0, typegoose_1.prop)({ required: true }),
    tslib_1.__metadata("design:type", Date)
], Discharge.prototype, "date", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ required: true }),
    tslib_1.__metadata("design:type", String)
], Discharge.prototype, "criteria", void 0);
class Hospital extends BaseEntry {
}
tslib_1.__decorate([
    (0, typegoose_1.prop)({
        trim: true,
        default: EntryType.Hospital,
    }),
    tslib_1.__metadata("design:type", String)
], Hospital.prototype, "type", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ required: true }),
    tslib_1.__metadata("design:type", Discharge)
], Hospital.prototype, "discharge", void 0);
exports.Hospital = Hospital;
class OccupationalHealthcare extends BaseEntry {
}
tslib_1.__decorate([
    (0, typegoose_1.prop)({
        trim: true,
        default: EntryType.OccupationalHealthcare,
    }),
    tslib_1.__metadata("design:type", String)
], OccupationalHealthcare.prototype, "type", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ required: true, trim: true }),
    tslib_1.__metadata("design:type", String)
], OccupationalHealthcare.prototype, "employerName", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)(),
    tslib_1.__metadata("design:type", SickLeave)
], OccupationalHealthcare.prototype, "sickLeave", void 0);
exports.OccupationalHealthcare = OccupationalHealthcare;
class Patient {
}
tslib_1.__decorate([
    (0, typegoose_1.prop)({ required: true, unique: true, trim: true }),
    tslib_1.__metadata("design:type", String)
], Patient.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ required: true, unique: true, trim: true }),
    tslib_1.__metadata("design:type", String)
], Patient.prototype, "ssn", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ required: true, trim: true }),
    tslib_1.__metadata("design:type", String)
], Patient.prototype, "occupation", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ required: true }),
    tslib_1.__metadata("design:type", Date)
], Patient.prototype, "dateOfBirth", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({
        required: true,
        enum: Gender,
    }),
    tslib_1.__metadata("design:type", String)
], Patient.prototype, "gender", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: mongoose.Schema.Types.Mixed, required: true, default: [] }),
    tslib_1.__metadata("design:type", mongoose.Types.Array)
], Patient.prototype, "entries", void 0);
exports.Patient = Patient;
exports.DiagnoseModel = (0, typegoose_1.getModelForClass)(Diagnose, {
    schemaOptions: {
        versionKey: false,
        toObject: {
            virtuals: true,
            transform: (_doc, ret) => {
                ret.id = ret._id.toString();
                delete ret._id;
            },
        },
        toJSON: {
            virtuals: true,
            transform: (_doc, ret) => {
                ret.id = ret._id.toString();
                delete ret._id;
            },
        },
    },
    options: { allowMixed: typegoose_1.Severity.ALLOW },
});
exports.HealthCheckModel = (0, typegoose_1.getModelForClass)(HealthCheck, {
    schemaOptions: {
        versionKey: false,
        toObject: {
            virtuals: true,
            transform: (_doc, ret) => {
                ret.id = ret._id.toString();
                delete ret._id;
            },
        },
        toJSON: {
            virtuals: true,
            transform: (_doc, ret) => {
                ret.id = ret._id.toString();
                delete ret._id;
            },
        },
    },
});
exports.HospitalEntryModel = (0, typegoose_1.getModelForClass)(Hospital, {
    schemaOptions: {
        versionKey: false,
        toObject: {
            virtuals: true,
            transform: (_doc, ret) => {
                ret.id = ret._id.toString();
                delete ret._id;
            },
        },
        toJSON: {
            virtuals: true,
            transform: (_doc, ret) => {
                ret.id = ret._id.toString();
                delete ret._id;
            },
        },
    },
});
exports.OHCModel = (0, typegoose_1.getModelForClass)(OccupationalHealthcare, {
    schemaOptions: {
        versionKey: false,
        toObject: {
            virtuals: true,
            transform: (_doc, ret) => {
                ret.id = ret._id.toString();
                delete ret._id;
            },
        },
        toJSON: {
            virtuals: true,
            transform: (_doc, ret) => {
                ret.id = ret._id.toString();
                delete ret._id;
            },
        },
    },
    options: { allowMixed: typegoose_1.Severity.ALLOW },
});
exports.PatientModel = (0, typegoose_1.getModelForClass)(Patient, {
    schemaOptions: {
        versionKey: false,
        toObject: {
            virtuals: true,
            transform: (_doc, ret) => {
                ret.id = ret._id.toString();
                delete ret._id;
            },
        },
        toJSON: {
            virtuals: true,
            transform: (_doc, ret) => {
                ret.id = ret._id.toString();
                delete ret._id;
            },
        },
    },
    options: { allowMixed: typegoose_1.Severity.ALLOW },
});
//# sourceMappingURL=index.js.map