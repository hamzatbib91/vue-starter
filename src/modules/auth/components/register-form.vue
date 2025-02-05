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
import { registerSchema } from '../Schemas/register.schema';


const formSchema = toTypedSchema(registerSchema);

const form = useForm({
  validationSchema: formSchema,
});

const onSubmit = form.handleSubmit((values) => {
  console.log('Form submitted!', values);
});
</script>

<template>
  <form @submit="onSubmit" class="grid gap-2">
    <!-- Name Field -->
    <FormField v-slot="{ componentField }" name="name">
      <FormItem>
        <FormLabel>{{ $t('name') }}</FormLabel>
        <FormControl>
          <Input
            type="text"
            :placeholder="$t('placeholderName')"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

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

    <div class="grid md:grid-cols-2 gap-2">
    <!-- Password Field -->
    <FormField v-slot="{ componentField }" name="password">
      <FormItem>
        <FormLabel>{{ $t('password') }}</FormLabel>
        <FormControl>
          <Input
            type="password"
            :placeholder="$t('placeholderPassword')"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="confirmPassword">
      <FormItem>
        <FormLabel>{{ $t('confirmPassword') }}</FormLabel>
        <FormControl>
          <Input
            type="password"
            :placeholder="$t('placeholderConfirmPassword')"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
  </div>
    
    <!-- Submit Button -->
    <Button type="submit">{{ $t('submit') }}</Button>
  </form>
</template>

<fluent locale="en">

name = Name
placeholderName = Enter your name

email = Email
placeholderEmail = name@example.com

password = Password
placeholderPassword = Enter your password

confirmPassword = Confirm Password
placeholderConfirmPassword = Confirm your password

</fluent>


