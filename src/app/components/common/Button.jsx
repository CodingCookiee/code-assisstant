"use client"

import { forwardRef } from "react"
import { cva } from "class-variance-authority"

const buttonStyles = cva(
  "outline-none inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-0 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary: "bg-black-200 text-white hover:bg-black-300 dark:bg-white dark:text-black-200 dark:hover:bg-white-800",
        ghost: "text-black-300 dark:text-white-800 hover:bg-black-100/10 dark:hover:bg-white-500/10",
        outline: "border border-black-200 hover:bg-black-100/10 dark:border-white-700 dark:hover:bg-white-500/10",
        danger: "bg-red-500 text-white hover:bg-red-600",
        custom: ""
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4",
        lg: "h-12 px-6 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

const Button = forwardRef(({ 
  className = "",
  variant,
  size,
  children,
  ...props 
}, ref) => {
  return (
    <button
      ref={ref}
      className={buttonStyles({ variant, size, className })}
      {...props}
    >
      {children}
    </button>
  )
})

Button.displayName = "Button"

export { Button, buttonStyles }
