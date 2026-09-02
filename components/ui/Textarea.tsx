import { type TextareaHTMLAttributes, forwardRef } from "react";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, id, className = "", ...rest }, ref) => {
    const textareaId = id ?? rest.name;

    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={textareaId} className="font-mono text-xs uppercase tracking-wide text-slate">
          {label}
        </label>
        <textarea
          ref={ref}
          id={textareaId}
          rows={5}
          className={`border border-line bg-transparent px-4 py-3 font-body text-ink placeholder:text-slate/50 focus-visible:border-signal ${className}`}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${textareaId}-error` : undefined}
          {...rest}
        />
        {error ? (
          <p id={`${textareaId}-error`} className="text-sm text-signal-deep" role="alert">
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";
