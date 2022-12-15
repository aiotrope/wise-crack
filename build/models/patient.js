"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PatientSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    occupation: {
        type: String,
        required: true,
        trim: true,
    },
    ssn: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    dateOfBirth: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: (val) => /^\d\d\d\d\-\d\d\-\d\d$/gm.test(val),
            message: (props) => `${props.value} is not valid date of birth!`,
        },
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: true,
    },
});
PatientSchema.virtual('id').get(function () {
    return this._id.toHexString();
});
PatientSchema.set('toJSON', {
    virtuals: true,
    transform: (_document, retObj) => {
        delete retObj.__v;
    },
});
const PatientModel = (0, mongoose_1.model)('PatientModel', PatientSchema);
exports.default = PatientModel;
//# sourceMappingURL=patient.js.map