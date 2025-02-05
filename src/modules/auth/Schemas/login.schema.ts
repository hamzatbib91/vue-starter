import { fluent } from '@/plugins/fluent';
import * as z from 'zod';


/**
 * The schema for the login form.
 */
export const loginSchema = z.object({
  email: z.string().email(fluent.$t('invalid-email-address')),
  password: z.string().min(6, fluent.$t('password-must-be-at-least-6-characters')),
});
