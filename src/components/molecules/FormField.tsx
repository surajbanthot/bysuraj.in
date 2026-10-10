import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

const control =
  "w-full border-b border-border bg-transparent py-3 text-lg text-ink placeholder:text-faint focus:border-accent focus:outline-none transition-colors";

type Base = { id: string; label: string; className?: string };
type InputField = Base & { multiline?: false } & Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "className">;
type AreaField = Base & { multiline: true } & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id" | "className">;

/** A labelled form control: underlined input, or a textarea with `multiline`. */
export default function FormField(props: InputField | AreaField) {
  const { id, label, className = "", ...field } = props;
  const { multiline, ...rest } = field;
  return (
    <div className={className}>
      <label htmlFor={id} className="label">
        {label}
      </label>
      {multiline ? (
        <textarea id={id} className={`${control} resize-none`} {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)} />
      ) : (
        <input id={id} className={control} {...(rest as InputHTMLAttributes<HTMLInputElement>)} />
      )}
    </div>
  );
}
