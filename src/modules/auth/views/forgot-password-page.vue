<script setup lang="ts">
import ForgotPasswordForm from '../components/forgot-password-form.vue';
</script>

<template>
  <div class="w-full min-h-screen lg:grid lg:grid-cols-2">
    <!-- Image Section -->
    <div class="hidden bg-muted lg:block order-last">
      <img
        src="/placeholder.svg"
        alt="Password reset illustration"
        width="1920"
        height="1080"
        class="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        loading="lazy"
      >
    </div>

    <!-- Content Section -->
    <div class="flex items-center justify-center p-6 sm:p-8">
      <div class="w-full max-w-sm space-y-6">
        <!-- Header -->
        <div class="space-y-2 text-center">
          <h1 class="text-3xl font-bold tracking-tight">
            {{ $t('forgot-password') }}
          </h1>
          <p class="text-muted-foreground">
            {{ $t('enter-your-email-below-to-reset-your-password') }}
          </p>
        </div>

        <!-- Form -->
        <ForgotPasswordForm />

        <!-- Navigation Links -->
        <div class="space-y-4 text-center">
          <p class="text-sm text-muted-foreground">
            {{ $t('remember-your-password') }}
            <a
              href="/login"
              class="font-medium underline underline-offset-4 hover:text-primary transition-colors"
            >
              {{ $t('login') }}
            </a>
          </p>
          
          <div class="flex items-center justify-center gap-2 text-sm">
            <span class="text-muted-foreground">{{ $t('no-account') }}</span>
            <a
              href="/register"
              class="font-medium underline underline-offset-4 hover:text-primary transition-colors"
            >
              {{ $t('create-an-account') }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<fluent locale="en">
create-an-account = Create an account
enter-your-email-below-to-reset-your-password = Enter your email to reset your password
forgot-password = Reset Your Password
login = Sign in here
remember-your-password = Remember your password?
no-account = Don't have an account?
</fluent>