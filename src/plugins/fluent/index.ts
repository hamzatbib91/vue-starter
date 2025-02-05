import type { App } from 'vue';
import { createFluentVue } from 'fluent-vue';
import { enFluentBundle } from './en-bundle';
import { SupportedLanguage } from '@/shared/constants/supported-language';

// Create a FluentVue instance with the English bundle
export const fluent = createFluentVue({
  bundles: [enFluentBundle],
});

/**
 * Changes the language of the FluentVue instance.
 * 
 * @param lang - The language to switch to.
 * @throws Will throw an error if the language is not supported.
 */
export const changeLanguage = (lang: SupportedLanguage) => {
  switch (lang) {
    case SupportedLanguage.EN: {
      fluent.bundles = [enFluentBundle];
      break;
    }
    default: {
      fluent.bundles = [enFluentBundle];
      throw new Error(`Language "${lang}" not supported`);
    }
  }
};

/**
 * Initializes the FluentVue plugin with the given Vue app instance.
 * 
 * @param app - The Vue app instance.
 */
export const initFluent = (app: App<Element>) => {
  app.use(fluent);
};
