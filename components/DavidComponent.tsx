import { Dictionary } from "@/app/[lang]/dictionaries";
import Image from "next/image";
import Link from "next/link";

// Import images
import image1 from "@/public/assets/imageDavid-1.jpg";
import image2 from "@/public/assets/imageDavid-2.jpg";
import image3 from "@/public/assets/imageDavid-3.jpg";

// temp

export default function DavidComponent({ dict, lang }: { dict: Dictionary, lang: string }) {
    return (
        <section>

            {/* Hero Section */}
            <div className="relative w-full h-[80vh] overflow-hidden">
                <Image
                    src={image1}
                    alt="Window renovation"
                    placeholder="blur"
                    quality={100}
                    className="object-cover w-full h-full"
                    priority
                />
                <div className="absolute inset-0 bg-background/80 flex flex-col items-center justify-center">
                    <div className="slide-in-left">
                        <h1 className="text-3xl md:text-5xl font-bold mb-4 text-center">{dict.home.title}</h1>
                        <p className="text-xl max-w-2xl text-center text-foreground/80">{dict.home.description}</p>
                        <Link href={`/${lang}/contact`} className="mt-8 px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-md hover:bg-secondary transition-colors inline-block">
                            {dict.CTA.contactUs}
                        </Link>
                    </div>
                </div>
            </div>

            {/* Services Section */}
            <div className="container mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold text-center mb-12 text-foreground">{dict.whatWeDo.title}</h2>
                <div className="grid md:grid-cols-2 gap-12">
                    <div className="relative h-[400px] slide-in-left">
                        <Image
                            src={image2}
                            alt="Planning and expertise"
                            placeholder="blur"
                            quality={100}
                            className="object-cover w-full h-full rounded-lg"
                        />
                    </div>
                    <div className="flex flex-col justify-center slide-in-right">
                        <div className="bg-card p-6 rounded-lg shadow-lg">
                            <h3 className="text-2xl font-semibold mb-4 text-card-foreground">{dict.weCover.service1Title}</h3>
                            <p className="text-muted-foreground">{dict.weCover.service1Description}</p>
                            <h3 className="text-2xl font-semibold mb-4 mt-8 text-card-foreground">{dict.weCover.service2Title}</h3>
                            <p className="text-muted-foreground">{dict.weCover.service2Description}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quality Section */}
            <div className="bg-muted py-16">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="slide-in-left">
                            <h2 className="text-3xl font-bold mb-6 text-foreground">{dict.imageComparison.title}</h2>
                            <p className="text-muted-foreground mb-8">{dict.imageComparison.description}</p>
                            <div className="relative h-[300px]">
                                <Image
                                    src={image3}
                                    alt="Window renovation process"
                                    placeholder="blur"
                                    quality={100}
                                    className="object-cover w-full h-full rounded-lg"
                                />
                            </div>
                        </div>
                        <div className="space-y-6 slide-in-right">
                            <div className="bg-card p-6 rounded-lg shadow-lg">
                                <h3 className="text-xl font-semibold mb-3 text-card-foreground">{dict.informative.title}</h3>
                                <p className="text-muted-foreground">{dict.informative.text1}</p>
                            </div>
                            <div className="bg-card p-6 rounded-lg shadow-lg">
                                <h3 className="text-xl font-semibold mb-3 text-card-foreground">{dict.ourService.leftSection.title}</h3>
                                <p className="text-muted-foreground">{dict.ourService.leftSection.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact CTA */}
            <div className="container mx-auto px-4 py-16 text-center">
                <div className="bg-card p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
                    <h2 className="text-3xl font-bold mb-6 text-card-foreground">{dict.contactForm.title}</h2>
                    <p className="text-muted-foreground mb-8">{dict.footer.title}</p>
                    <Link href={`/${lang}/contact`} className="mt-8 px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-md hover:bg-secondary transition-colors inline-block">
                        {dict.CTA.bookConsultation}
                    </Link>
                </div>
            </div>

        </section>
    );
}