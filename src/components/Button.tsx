"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";
import { FaSpinner } from "react-icons/fa"; // You'll need to install react-icons

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, isLoading, children, ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
          "bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2",
          isLoading && "cursor-not-allowed",
          className
        )}
        ref={ref}
        disabled={props.disabled || isLoading}
        {...props}
      >
        {isLoading ? <FaSpinner className="mr-2 h-4 w-4 animate-spin" /> : null}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };