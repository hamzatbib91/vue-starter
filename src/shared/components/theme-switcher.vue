<template>
  <button class="bg-transparent text-2xl text-brand-main" @click="theme = theme === 'dark' ? 'light' : 'dark'">
    <Icon :icon="theme === 'dark' ? sunIcon : moonIcon" />
  </button>
</template>

<script lang="ts" setup>
import { useColorMode } from '@vueuse/core';
import { Icon } from '@iconify/vue';
import sunIcon from '@iconify-icons/akar-icons/sun';
import moonIcon from '@iconify-icons/akar-icons/moon';

/**
 * Manages the theme (light or dark) of the application.
 * Uses the `useColorMode` composable from `@vueuse/core` to handle theme switching.
 */
const theme = useColorMode({
  selector: 'html',
  attribute: 'class',
  modes: {
    light: 'light-theme',
    dark: 'dark-theme', 
  },
  storageKey: 'theme',
});
</script>

<style lang="postcss" scoped></style>
