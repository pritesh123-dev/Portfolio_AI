"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * @param {Object} props
 * @param {string} [props.className]
 * @param {React.Ref<HTMLDivElement>} ref
 */
const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)} {...props} />
))
Card.displayName = "Card"

/**
 * @param {Object} props
 * @param {string} [props.className]
 * @param {React.Ref<HTMLDivElement>} ref
 */
const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
))
CardHeader.displayName = "CardHeader"

/**
 * @param {Object} props
 * @param {string} [props.className]
 * @param {React.Ref<HTMLHeadingElement>} ref
 */
const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props} />
))
CardTitle.displayName = "CardTitle"

/**
 * @param {Object} props
 * @param {string} [props.className]
 * @param {React.Ref<HTMLParagraphElement>} ref
 */
const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
))
CardDescription.displayName = "CardDescription"

/**
 * @param {Object} props
 * @param {string} [props.className]
 * @param {React.Ref<HTMLDivElement>} ref
 */
const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

/**
 * @param {Object} props
 * @param {string} [props.className]
 * @param {React.Ref<HTMLDivElement>} ref
 */
const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }

