import { getDictionary } from "./dictionaries"
import { Hero } from "@/components/Hero"
import DavidComponent from "@/components/DavidComponent"

export default async function Home({
    params: { lang },
}: {
    params: { lang: string }
}) {
    const dict = await getDictionary(lang)

    return (
        <div className="w-full h-full flex flex-col gap-10 pb-16 overflow-auto">
            <Hero dict={dict} />
            <DavidComponent dict={dict} lang={lang} />
        </div>
    )
} 