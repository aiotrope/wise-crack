import * as z from 'zod'

const Gender = {
  Male: 'male',
  Female: 'female',
  Other: 'other',
} as const

export const EntryType = {
  OccupationalHealthcare: 'OccupationalHealthcare',
  Hospital: 'Hospital',
  HealthCheckEntry: 'HealthCheck',
} as const

export const HealthCheckRating = {
  Healthy: 0,
  LowRisk: 1,
  HighRisk: 2,
  CriticalRisk: 3,
} as const

export const DiagnoseCode = z.object({
  id: z.string(),
  code: z.string(),
  name: z.string(),
  latin: z.string(),
})

export const PartialSickLeaveSchema = z.object({
  startDate: z.string().regex(/^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}$/),
  endDate: z.string().regex(/^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}$/),
})

export const DischargeSchema = z.object({
  date: z.string().regex(/^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}$/),
  criteria: z.string(),
})

export const EntryCode = DiagnoseCode.partial()

export const PartialEntriesSchema = z.object({
  id: z.string(),
  description: z.string(),
  specialist: z.string(),
  date: z.date(),
  diagnose: z.string(),
  diagnosisCodes: z.array(EntryCode),
  type: z.string(),
  employerName: z.string(),
  sickLeave: PartialSickLeaveSchema,
  discharge: DischargeSchema,
  healthCheckRating: z.nativeEnum(HealthCheckRating),
})

export const EntriesSchema = PartialEntriesSchema.partial()

export const PatientDataSchema = z.object({
  id: z.string().min(24),
  name: z.string().trim().min(2).max(30),
  ssn: z.string().trim().min(10).max(14),
  dateOfBirth: z.string().regex(/^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}$/),
  occupation: z.string().trim().min(2).max(30),
  gender: z.nativeEnum(Gender),
  entries: z.array(EntriesSchema).optional(),
})

const BaseEntrySchema = z.object({
  id: z.string().min(23),
  description: z.string().min(5),
  specialist: z.string().min(3),
  date: z.string().regex(/^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}$/),
  diagnose: z.string().min(23),
  diagnosisCodes: z.array(DiagnoseCode).optional(),
})

export const OHCEntrySchema = BaseEntrySchema.extend({
  type: z.string().default(EntryType.OccupationalHealthcare),
  employerName: z.string().min(2),
  sickLeave: PartialSickLeaveSchema,
})

export const HospitalEntrySchema = BaseEntrySchema.extend({
  type: z.string().default(EntryType.Hospital),
  discharge: DischargeSchema,
})

export const HealthCheckEntrySchema = BaseEntrySchema.extend({
  type: z.string().default(EntryType.HealthCheckEntry),
  healthCheckRating: z.number().nonnegative().lte(3).default(0),
  rating: z.string().max(1).optional(),
})

export const OHCEntryFormSchema = OHCEntrySchema.omit({
  id: true,
  diagnosisCodes: true,
})

export const HospitalEntryFormSchema = HospitalEntrySchema.omit({
  id: true,
  diagnosisCodes: true,
})

export const HealthCheckEntryFormSchema = HealthCheckEntrySchema.omit({
  id: true,
  diagnosisCodes: true,
})

export const PatientIdSchema = PatientDataSchema.pick({ id: true })

export const PatientFormSchema = PatientDataSchema.omit({
  id: true,
  entries: true,
})

export type PatientForm = z.infer<typeof PatientFormSchema>

export type Patient = z.infer<typeof PatientDataSchema>

export type Entries = z.infer<typeof EntriesSchema>

export type PatientId = z.infer<typeof PatientIdSchema>

export type TDiagnoseCode = z.infer<typeof DiagnoseCode>

export type OHCEntry = z.infer<typeof OHCEntrySchema>

export type OHCEntryForm = z.infer<typeof OHCEntryFormSchema>

export type HospitalEntry = z.infer<typeof HospitalEntrySchema>

export type HospitalEntryForm = z.infer<typeof HospitalEntryFormSchema>

export type THealthCheckEntry = z.infer<typeof HealthCheckEntrySchema>

export type THospitalEntryForm = z.infer<typeof HealthCheckEntryFormSchema>
