import { getDictionary } from "../dictionaries";

export default async function Privacy({ params: { lang } }: { params: { lang: string } }) {
    const dict = await getDictionary(lang);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl text-primary font-bold mb-8 mt-24">{dict.privacy.title}</h1>
            <div className="space-y-6">
                {dict.privacy.snippets.map((snippet, index) => (
                    <div key={index} className="space-y-2">
                        {snippet.title && (
                            <p className="font-bold text-xl">
                                {snippet.title}
                            </p>
                        )}
                        {snippet.text && (
                            <p className="text-base leading-relaxed">
                                {snippet.text}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}