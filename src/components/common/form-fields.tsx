// Shared accessible form controls with styling consistent across the app.
import type {
    InputHTMLAttributes,
    ReactNode,
    SelectHTMLAttributes,
    TextareaHTMLAttributes,
} from "react";

const CONTROL_CLASS_NAME =
    "w-full rounded-lg border border-zinc-700 bg-zinc-950/70 px-3 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 transition-colors focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500";
const LABEL_CLASS_NAME = "text-sm font-medium text-zinc-300";

interface FieldProps {
    id: string;
    label: string;
    containerClassName?: string;
}

type InputFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "id"> & FieldProps;

export function InputField({
    id,
    label,
    containerClassName = "",
    className = "",
    ...inputProps
}: InputFieldProps) {
    return (
        <div className={`space-y-1.5 ${containerClassName}`}>
            <label htmlFor={id} className={LABEL_CLASS_NAME}>{label}</label>
            <input id={id} className={`${CONTROL_CLASS_NAME} ${className}`} {...inputProps} />
        </div>
    );
}

interface SelectFieldProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "id">, FieldProps {
    children: ReactNode;
}

export function SelectField({
    id,
    label,
    containerClassName = "",
    className = "",
    children,
    ...selectProps
}: SelectFieldProps) {
    return (
        <div className={`space-y-1.5 ${containerClassName}`}>
            <label htmlFor={id} className={LABEL_CLASS_NAME}>{label}</label>
            <select id={id} className={`${CONTROL_CLASS_NAME} ${className}`} {...selectProps}>
                {children}
            </select>
        </div>
    );
}

type TextareaFieldProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id"> & FieldProps;

export function TextareaField({
    id,
    label,
    containerClassName = "",
    className = "",
    ...textareaProps
}: TextareaFieldProps) {
    return (
        <div className={`space-y-1.5 ${containerClassName}`}>
            <label htmlFor={id} className={LABEL_CLASS_NAME}>{label}</label>
            <textarea id={id} className={`${CONTROL_CLASS_NAME} ${className}`} {...textareaProps} />
        </div>
    );
}

type CheckboxFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "type"> & FieldProps;

export function CheckboxField({
    id,
    label,
    containerClassName = "",
    className = "",
    ...inputProps
}: CheckboxFieldProps) {
    return (
        <label
            htmlFor={id}
            className={`flex cursor-pointer items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-950/40 px-4 py-3 text-sm text-zinc-300 transition-colors hover:border-zinc-700 ${containerClassName}`}
        >
            <input
                id={id}
                type="checkbox"
                className={`h-4 w-4 rounded border-zinc-700 bg-zinc-900 accent-violet-500 focus:ring-violet-500 ${className}`}
                {...inputProps}
            />
            {label}
        </label>
    );
}
