<script setup lang="ts">
import LoginForm from '../components/login-form.vue';
</script>

<template>
  <div class="w-full lg:grid  lg:grid-cols-2 xl:min-h-full">
    <div class="flex items-center justify-center py-12">
      <div class="mx-auto grid w-[350px] gap-6">
        <div class="grid gap-2 text-center">
          <h1 class="text-3xl font-bold">
            {{ $t('login') }}
          </h1>
          <p class="text-balance text-muted-foreground">
            {{ $t('login-description') }}
          </p>
        </div>
        <LoginForm />
        <div class="text-center text-sm">
          <a href="/forgot-password" class="underline">
            {{ $t('forgot-password') }}
          </a>
        </div>
        <div class="mt-4 text-center text-sm">
          {{ $t('dont-have-account') }}
          <a href="/register" class="underline">
            {{ $t('sign-up') }}
          </a>
        </div>
      </div>
    </div>
    <div class="hidden bg-muted lg:block">
      <img
        src="/placeholder.svg"
        alt="Image"
        width="1920"
        height="1080"
        class="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
      >
    </div>
  </div>
</template>

<fluent locale="en">
login = Login
login-description = Enter your email below to login to your account
dont-have-account = Don't have an account?
sign-up = Sign up
forgot-password = Forgot your password?
</fluent>