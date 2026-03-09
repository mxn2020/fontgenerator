// i18n configuration for FontGenerator
const translations = {
    en: { appName: 'FontGenerator', description: 'Google Fonts recommendations with live previews' },
    de: { appName: 'FontGenerator', description: 'Google Fonts recommendations with live previews (DE)' },
} as const

export type Locale = keyof typeof translations
export const defaultLocale: Locale = 'en'
export const supportedLocales = Object.keys(translations) as Locale[]

export function t(key: keyof typeof translations.en, locale: Locale = defaultLocale): string {
    return translations[locale]?.[key] ?? translations.en[key] ?? key
}

export default translations
