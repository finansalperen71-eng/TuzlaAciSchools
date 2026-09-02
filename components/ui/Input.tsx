import { type InputHTMLAttributes, forwardRef } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, className = "", ...rest }, ref) => {
    const inputId = id ?? rest.name;

    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={inputId} className="font-mono text-xs uppercase tracking-wide text-slate">
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          className={`border border-line bg-transparent px-4 py-3 font-body text-ink placeholder:text-slate/50 focus-visible:border-signal ${className}`}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...rest}
        />
        {error ? (
          <p id={`${inputId}-error`} className="text-sm text-signal-deep" role="alert">
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);

Input.displayName = "Input";
