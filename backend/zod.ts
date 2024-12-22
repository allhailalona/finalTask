import { z } from 'zod'

// Base schema for common fields
const baseSchema = z.object({
 accountNo: z.string().min(1, "Account number is required"),
 sum: z.number().positive("Sum must be positive")
})

// Specific schemas for each action
export const depositSchema = baseSchema
export const withdrawSchema = baseSchema
export const loanSchema = baseSchema.extend({
 interest: z.number().positive("Interest must be positive"),
 noOfPayments: z.number().int().positive("Number of payments must be positive")
})

// Type for backend validation
export type Action = z.infer<typeof depositSchema>
export type LoanAction = z.infer<typeof loanSchema>