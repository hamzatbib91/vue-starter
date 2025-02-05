import enMessages from './en.ftl?raw';
import { FluentBundle, FluentResource } from '@fluent/bundle';
import { SupportedLanguage } from '@/shared/constants/supported-language';

/**
 * Creates a FluentBundle instance for the English language.
 */
export const enFluentBundle = new FluentBundle(SupportedLanguage.EN);

// Add the English messages to the FluentBundle instance
enFluentBundle.addResource(new FluentResource(enMessages));
