import Header from "@/components/Header";
import Footer from "@/components/Footer";
import React from "react";
import { getDictionary, Dictionary } from "./dictionaries";
import { FontProvider } from "@/components/context/FontProvider";


// Layout component for language-specific pages
// This component wraps the content of each page with a common header and footer
export default async function LangLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { lang: string };
}) {
    const dict: Dictionary = await getDictionary(params.lang)


    return (
        <FontProvider>
            <div className="h-screen">
                <div className="fixed top-0 right-0 h-full w-[12wh] z-50">
                    <Header dict={dict} lang={params.lang} />
                </div>
                <div className="flex flex-col h-full pt-[0vh]">
                    <main className="flex-grow w-full bg-background">
                        {children}
                    </main>
                    <Footer dict={dict} lang={params.lang} />
                </div>
            </div>
        </FontProvider>
    );
}
