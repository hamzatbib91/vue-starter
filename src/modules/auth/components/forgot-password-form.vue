<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { Button } from '@/shared/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';
import { forgotPasswordSchema } from '../Schemas/forgot-password.schema';


const formSchema = toTypedSchema(forgotPasswordSchema);

const form = useForm({
  validationSchema: formSchema,
});

const onSubmit = form.handleSubmit((values) => {
  console.log('Form submitted!', values);
});
</script>

<template>
  <form @submit="onSubmit" class="grid gap-2">
    <!-- Email Field -->
    <FormField v-slot="{ componentField }" name="email">
      <FormItem>
        <FormLabel>{{ $t('email') }}</FormLabel>
        <FormControl>
          <Input
            type="email"
            :placeholder="$t('placeholderEmail')"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button type="submit">{{ $t('submit') }}</Button>
  </form>
</template>

<fluent locale="en">
email = Email
placeholderEmail = name@example.com
</fluent>


