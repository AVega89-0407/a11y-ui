import type { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export function Button({
  variant = "primary",
  className,
  ...rest
}: ButtonProps) {
  return (
    <button
      type="button"
      className={[styles.button, styles[variant], className]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    />
  );
}
