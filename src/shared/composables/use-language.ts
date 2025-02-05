import { changeLanguage as changeAppLanguage } from '@/plugins/fluent';
import { computed } from 'vue';
import { SupportedLanguage } from '../constants/supported-language';
import { useAppStorage } from './use-app-storage';

const language = useAppStorage<SupportedLanguage>('lang', SupportedLanguage.EN, { prefix: '' });

/**
 * Composable to manage the application's language settings.
 * 
 * @returns An object with methods to change the language and a computed reference to the current language.
 */
export const useLanguage = () => {
  /**
   * Changes the application's language.
   * 
   * @param lang - The language to switch to.
   */
  function changeLanguage(lang: SupportedLanguage) {
    language.value = lang;
    changeAppLanguage(lang);
  }

  /**
   * A computed reference to the current language.
   */
  const currentLanguage = computed(() => language.value);

  return {
    changeLanguage,
    currentLanguage,
  };
};