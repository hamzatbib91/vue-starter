<template>
  <div>
    <button v-if="currentLanguage === SupportedLanguage.EN" @click="toEnglish()">English</button>
  </div>
</template>

<script lang="ts" setup>
import { useLanguage } from '../composables/use-language';
import { SupportedLanguage } from '../constants/supported-language';

const { changeLanguage, currentLanguage } = useLanguage();

/**
 * Changes the language to English.
 */
const toEnglish = () => {
  changeLanguage(SupportedLanguage.EN);
};
</script>

<style lang="postcss" scoped>
/* Styles for the button */
button {
  @apply rounded border border-brand-main px-spacer;
  @apply hover:bg-brand-main hover:text-on-brand-main;
}
</style>
