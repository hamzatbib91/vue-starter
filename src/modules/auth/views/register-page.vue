<script setup lang="ts">
import RegisterForm from '../components/register-form.vue';
</script>

<template>
  <div class="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
    <div class="hidden bg-muted lg:block">
      <img
        src="/placeholder.svg"
        alt="Image"
        width="1920"
        height="1080"
        class="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
      >
    </div>
  <div class="flex items-center justify-center py-12">
      <div class="mx-auto grid w-[350px] gap-6">
        <div class="grid gap-2 text-center">
          <h1 class="text-3xl font-bold">
            {{ $t('register') }}
          </h1>
          <p class="text-balance text-muted-foreground">
            {{ $t('create-an-account') }}
          </p>
        </div>
        <RegisterForm />
        <div class="mt-4 text-center text-sm">
          {{ $t('do-you-have-account') }}
          <a href="/login" class="underline">
            {{ $t('login') }}
          </a>
        </div>
      </div>
    </div>
    </div>
</template>

<fluent locale="en">
register = Register
create-an-account = Create an account
do-you-have-account = Do you have an account?
login = Login
</fluent>