"use client"
import { ThemeProvider as NextThemesProvider } from "next-themes"

/**
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {string} [props.attribute]
 * @param {string} [props.defaultTheme]
 * @param {boolean} [props.enableSystem]
 * @param {boolean} [props.disableTransitionOnChange]
 */
export function ThemeProvider({ children, ...props }) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

