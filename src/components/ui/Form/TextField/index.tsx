import { ForwardedRef, forwardRef, ReactNode } from "react";
import { useFormContext, UseFormRegisterReturn } from "react-hook-form";
import { BaseProps, ClassName, resolveClassName, resolveProperties } from "../../Base";
import { Box, Inline } from "../../Box";
import "./style.css"

type BaseFieldProps = UseFormRegisterReturn;
type AdvancedFieldProps<T extends HTMLElement = HTMLInputElement> = {
  name: string;
  label?: ReactNode;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  inputProps?: BaseProps<T>;
  className?: ClassName,
  type?: "text" | "password" | "button"
};
export type TextFieldProps = Partial<BaseFieldProps> &
  AdvancedFieldProps<HTMLInputElement>;

export const TextField = (props: TextFieldProps) => {
  const { name, label, icon, iconPosition, inputProps, className,  ...otherProps } = props;
  const { register } = useFormContext();
  const p = register(name);
  const inError = useInError(name);
  const hasValue = useHasValue(name);
  const fieldProps = { label, icon, iconPosition, inputProps, ...otherProps, ...p };
  const cName = resolveClassName(["form-group", !!inError && "error", hasValue && "has-value", className])
  return (
    <Box className={cName}>
      <Label name={name} label={label} />
      <FieldGroup {...fieldProps} />
      <HelperMessage message={inError} />
    </Box>
  );
};

const useInError = (name: string) => {
  const {
    formState: { errors },
  } = useFormContext();
  const field = errors[name];
  if (field) return field.message?.toString();
  if (field) return true;
  return false;
};
const useHasValue = (name: string) => {
  const { watch } = useFormContext();
  const value = watch(name);
  return value && value.trim() !== "";
};

const HelperMessage = (props: { message?: string | boolean }) => {
  return <Inline className={[ !props.message && "blank", "helper-message" ]}>{props.message}</Inline>;
};

const Label = (props: { name: string; label: ReactNode }) => {
  return <label htmlFor={props.name}>{props.label}</label>;
};

const FieldGroup = forwardRef(
  (
    props: BaseFieldProps & AdvancedFieldProps<HTMLInputElement>,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const { label, icon, iconPosition, inputProps, ...otherProps } = props;
    const p = resolveProperties({ ...inputProps, ...otherProps });
    return (
      <Box className={"field-group"}>
        {icon && iconPosition !== "right" && icon}
        <input {...p} ref={ref} />
        {icon && iconPosition === "right" && icon}
      </Box>
    );
  }
);
