'use client'

import { Accordion, AccordionItem } from "@heroui/react"

export default function AccordionComponent({ items }: { items: any }) {
  return (
    <Accordion variant="light">
      {items.map((item: any, index: number) => (
        <AccordionItem key={index} title={item.title} className="accordion-item prose max-w-none">
          {item.content}
        </AccordionItem>
      ))}
    </Accordion>
  )
}
