import 'server-only'

const dictionaries = {
    en: () => import('../dictionaries/en.json').then((module) => module.default),
    sv: () => import('../dictionaries/sv.json').then((module) => module.default),
    es: () => import('../dictionaries/es.json').then((module) => module.default),
}
export type Dictionary = Awaited<ReturnType<typeof getDictionary>>

export const getDictionary = async (locale: string) => {
    return dictionaries[locale as keyof typeof dictionaries]()
} 