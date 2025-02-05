import * as z from 'zod'
import { fluent } from '@/plugins/fluent'

export const forgotPasswordSchema = z.object({
  email: z.string().email(fluent.$t('invalid-email-address')),
})
