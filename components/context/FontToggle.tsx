'use client'

import { useFont } from "./FontProvider";

export function FontToggle() {
    const { toggleFont, fontNames, fonts, font } = useFont();
    return (
        <button
            onClick={toggleFont}
            className="fixed bottom-4 z-50 right-4 bg-primary text-primary-foreground px-4 py-2 rounded"
        >
            Change Font ({fontNames[fonts.indexOf(font)]})
        </button>
    )
}