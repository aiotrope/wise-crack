import * as z from 'zod'

const Gender = {
  Male: 'male',
  Female: 'female',
  Other: 'other',
} as const

const HealthCheckRating = {
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
  startDate: z.date(),
  endDate: z.date(),
})

export const PartialOccupationalHealthcareSchema = z.object({
  type: z.string(),
  sickLeave: PartialSickLeaveSchema,
  employerName: z.string(),
})

export const DischargeSchema = z.object({
  date: z.date(),
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

export const PatientIdParamsSchema = z.object({
  id: z.string().min(24),
})

const withEntriesSchema = z.object({
  entries: z.array(EntriesSchema).optional(),
  entryType: z.string(),
})

const withIdSchema = PatientIdParamsSchema.merge(withEntriesSchema)

export const PatientDataSchema = z.object({
  name: z.string().trim().min(2).max(30),
  ssn: z.string().trim().min(10).max(14),
  dateOfBirth: z.string().regex(/^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}$/),
  occupation: z.string().trim().min(2).max(30),
  gender: z.nativeEnum(Gender),
})

export const PatientFullDataSchema = withIdSchema.merge(PatientDataSchema)

export type PatientIdParams = z.infer<typeof PatientIdParamsSchema>

export type PatientForm = z.infer<typeof PatientDataSchema>

export type Patient = z.infer<typeof PatientFullDataSchema>

export type Entries = z.infer<typeof EntriesSchema>
