import * as z from 'zod'

export const PatientIdParamsSchema = z.object({
  id: z.string().min(1),
})

const withEntriesSchema = z.object({
  entries: z.array(z.object({}).nullish()).optional(),
  entryType: z.string(),
})

const withIdSchema = PatientIdParamsSchema.merge(withEntriesSchema)

const Gender = {
  Male: 'male',
  Female: 'female',
  Other: 'other',
} as const

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
