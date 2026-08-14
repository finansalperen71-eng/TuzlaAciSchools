import { type InputHTMLAttributes, type ReactNode, forwardRef } from "react";

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: ReactNode;
  error?: string;
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, id, className = "", ...rest }, ref) => {
    const checkboxId = id ?? rest.name;

    return (
      <div className="flex flex-col gap-1.5">
        <div className="flex items-start gap-3">
          <input
            ref={ref}
            id={checkboxId}
            type="checkbox"
            className={`mt-1 h-4 w-4 shrink-0 accent-[color:var(--color-signal)] ${className}`}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${checkboxId}-error` : undefined}
            {...rest}
          />
          <label htmlFor={checkboxId} className="font-body text-sm text-slate">
            {label}
          </label>
        </div>
        {error ? (
          <p id={`${checkboxId}-error`} className="text-sm text-signal" role="alert">
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);

Checkbox.displayName = "Checkbox";
