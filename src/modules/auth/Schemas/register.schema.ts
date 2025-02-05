import * as z from 'zod';
import { fluent } from '@/plugins/fluent';

export const registerSchema = z.object({
  name: z.string().min(2, fluent.$t('name-must-be-at-least-2-characters')),
  email: z.string().email(fluent.$t('invalid-email-address')),
  password: z
      .string()
      .min(8, fluent.$t('password-must-be-at-least-8-characters'))
      .max(20, fluent.$t('password-must-not-be-greater-than-20-characters'))
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&.]{8,}$/,
        fluent.$t('password-must-contain-at-least-one-uppercase-letter-one-lowercase-letter-one-digit-and-one-special-character'),
      ),
    confirmPassword: z
      .string()
      .min(8, fluent.$t('password-must-be-at-least-8-characters'))
      .max(20, fluent.$t('password-must-not-be-greater-than-20-characters'))
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&.]{8,}$/,
        fluent.$t('password-must-contain-at-least-one-uppercase-letter-one-lowercase-letter-one-digit-and-one-special-character'),
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: fluent.$t('passwords-must-match'),
    path: ["confirmPassword"],
  });
