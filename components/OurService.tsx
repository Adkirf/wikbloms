'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Dictionary } from '@/app/[lang]/dictionaries'
import { useFont } from './context/FontProvider'
import { Button } from "./ui/button"
import { Eye } from "lucide-react"

export function OurSerivce({ dict }: { dict: Dictionary }) {
  const { font } = useFont();

  return (
    <section className={`bg-background min-h-[88vh] text-foreground py-8 flex flex-col px-8 md:px-12 lg:px-16 ${font.className}`}>
      <h1 className="mb-4">
        {dict.ourService.title}
      </h1>
      <Card className="w-full max-w-4xl mx-auto overflow-hidden">
        <div className="md:flex">
          <div className="flex-1 p-6 bg-primary/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-bold text-left">{dict.ourService.leftSection.title}</CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <p className="text-muted-foreground">
                {dict.ourService.leftSection.description}
              </p>
            </CardContent>
          </div>
          <Separator orientation="vertical" className="" />
          <div className="flex-1 p-6 bg-secondary/5">
            <div className="h-full flex flex-col justify-between">
              <CardContent className="pt-0">
                <p className="mt-4 text-muted-foreground">
                  {dict.ourService.rightSection.description}
                </p>
              </CardContent>
              <CardHeader className="pt-2">
                <CardTitle className="text-2xl font-bold text-right">{dict.ourService.rightSection.title}</CardTitle>
              </CardHeader>
            </div>
          </div>
        </div>
      </Card>
      <Button
        className="
                    mt-8
                    h-10
                    border border-primary bg-transparent text-foreground 
                    px-6 py-3 rounded-full text-base font-bold 
                    hover:bg-secondary hover:scale-105 
                    transition-all duration-300 
                    shadow-lg hover:shadow-xl
                    flex items-center
                "
        onClick={() => window.location.href = `/projects`}
      >
        <Eye className="h-5" />
        {dict.CTA.seeOurProjects}
      </Button>
    </section>
  )
}
