// components/ui/accordion.jsx
"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"
// import style from './accordion'

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef(({ className, ...props }, ref) => (
    <AccordionPrimitive.Item
        ref={ref}
        className={`accordion-item ${className || ''}`}
        {...props}
    />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef(({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Header className="accordion-header">
        <AccordionPrimitive.Trigger
            ref={ref}
            className={`accordion-trigger ${className || ''}`}
            {...props}
            style={{
                background: 'linear-gradient(to bottom right, #EFF6FF, #F5F3FF)',
                border: ' #EFF6FF',
                color: 'black'
            }}
        >
            {children}
            <ChevronDown className="accordion-icon" />
        </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = "AccordionTrigger"

const AccordionContent = React.forwardRef(({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Content
        ref={ref}
        className={`accordion-content ${className || ''}`}
        {...props}
    >
        <div className="accordion-content-inner">{children}</div>
    </AccordionPrimitive.Content>
))
AccordionContent.displayName = "AccordionContent"

export {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
}