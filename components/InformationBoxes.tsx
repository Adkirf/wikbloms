'use client'

import { Card, CardContent } from "@/components/ui/card";
import { Dictionary } from '@/app/[lang]/dictionaries'
import { useFont } from './context/FontProvider'

export function InformationBoxes({ dict }: { dict: Dictionary }) {
  const { font } = useFont();

  return (
    <section className={`bg-background min-h-[88vh] text-foreground flex flex-col px-8 md:px-12 lg:px-16 ${font.className}`}>
      <h1>
        {dict.informative.title}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card className="relative overflow-visible">
          <h1 className="absolute -top-8 -left-4 text-6xl font-bold text-primary z-10">1.</h1>
          <CardContent>
            <p className="text-muted-foreground pt-6">
              {dict.informative.text1}
            </p>
          </CardContent>
        </Card>
        <Card className="relative overflow-visible">
          <h1 className="absolute -top-8 -left-4 text-6xl font-bold text-primary z-10">2.</h1>
          <CardContent>
            <p className="text-muted-foreground pt-6">
              {dict.weCover.service1Description}
            </p>
          </CardContent>
        </Card>
        <Card className="relative overflow-visible">
          <h1 className="absolute -top-8 -left-4 text-6xl font-bold text-primary z-10">3.</h1>
          <CardContent>
            <p className="text-muted-foreground pt-6">
              {dict.weCover.service2Description}
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
