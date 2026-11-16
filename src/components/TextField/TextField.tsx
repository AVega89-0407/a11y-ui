import { useId, type InputHTMLAttributes } from "react";
import styles from "./TextField.module.css";

export interface TextFieldProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "id"
> {
  /** Synlig label. Krävs, eftersom ett fält utan label är otillgängligt. */
  label: string;
  /** Hjälptext under fältet. */
  hint?: string;
  /** Felmeddelande. När det finns markeras fältet som ogiltigt. */
  error?: string;
}

export function TextField({
  label,
  hint,
  error,
  required,
  className,
  ...rest
}: TextFieldProps) {
  const id = useId();
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;

  // Koppla ihop fältet med hjälptext och felmeddelande så att skärmläsare läser upp dem.
  const describedBy = [hint ? hintId : null, error ? errorId : null]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {required && (
          <span aria-hidden="true" className={styles.required}>
            {" "}
            *
          </span>
        )}
      </label>
      {hint && (
        <p id={hintId} className={styles.hint}>
          {hint}
        </p>
      )}
      <input
        {...rest}
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy || undefined}
        className={[styles.input, error ? styles.invalid : "", className]
          .filter(Boolean)
          .join(" ")}
      />
      {error && (
        <p id={errorId} role="alert" className={styles.error}>
          {error}
        </p>
      )}
    </div>
  );
}
