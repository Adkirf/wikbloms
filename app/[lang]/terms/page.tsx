import { getDictionary } from "../dictionaries";

export default async function Terms({ params: { lang } }: { params: { lang: string } }) {
    const dict = await getDictionary(lang);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl text-primary font-bold mb-8 pt-24">{dict.terms.title}</h1>

            {/* Info Box: Company Details */}
            <p>{dict.terms.company}</p>
            <div className="mt-2 mb-8">
                <p className="text-sm"><span className="font-semibold">Org.nr:</span> 516413-8900</p>
                <p className="text-sm"><span className="font-semibold">Address:</span> {dict.terms.address}</p>
                <p className="text-sm"><span className="font-semibold">Contact:</span> {dict.terms.email} | {dict.terms.phone}</p>
            </div>


            <div className="space-y-6">
                {dict.terms.snippets.map((snippet, index) => (
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