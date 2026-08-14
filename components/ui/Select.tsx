import { type SelectHTMLAttributes, forwardRef } from "react";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, id, options, placeholder, className = "", ...rest }, ref) => {
    const selectId = id ?? rest.name;

    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={selectId} className="font-mono text-xs uppercase tracking-wide text-slate">
          {label}
        </label>
        <select
          ref={ref}
          id={selectId}
          className={`border border-line bg-transparent px-4 py-3 font-body text-ink focus-visible:border-signal ${className}`}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${selectId}-error` : undefined}
          defaultValue=""
          {...rest}
        >
          {placeholder ? (
            <option value="" disabled>
              {placeholder}
            </option>
          ) : null}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error ? (
          <p id={`${selectId}-error`} className="text-sm text-signal" role="alert">
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);

Select.displayName = "Select";
