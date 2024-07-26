import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-gray-800 hover:bg-gray-800/5",
        primary: "text-white bg-primary-600 hover:bg-primary-600/90",
        "primary-outline":
          "text-primary-500 border border-primary-500 hover:bg-primary-500/20",
        destructive: "text-white bg-red-500 hover:bg-red-500/50",
        "destructive-outline":
          "text-red-500 border border-red-500 hover:bg-red-500/5",
        success: "text-white bg-green-500 hover:bg-green-500/50",
        "success-outline":
          "text-green-500 border border-green-500 hover:bg-green-500/5",
        outline: "border border-gray-500 bg-gray-800 hover:bg-gray-800/5",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        text: "text-primary-500 p-0 text-xs font-normal hover:bg-gray-600",
      },
      size: {
        default: "h-7 p-4",
        xs: "h-[26px] rounded-md px-3 py-1 text-xs font-medium",
        sm: "h-[37px] rounded-md px-3 py-2 text-sm font-medium",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          "pointer-events-auto",
          buttonVariants({ variant, size, className })
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
