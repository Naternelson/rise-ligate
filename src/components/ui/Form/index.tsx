import { ForwardedRef, forwardRef, PropsWithChildren } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { BaseProps, resolveProperties } from "../Base";
import "./style.css";
export type FormProps<T extends FieldValues = FieldValues> = PropsWithChildren<
  BaseProps<HTMLFormElement> & {
    options?: Parameters<typeof useForm<T>>[0];
    onSubmit?: (context: UseFormReturn<T>) => SubmitHandler<T>;
  }
>;

export const Form = forwardRef(function <T extends FieldValues = FieldValues>(
  props: FormProps<T>,
  ref: ForwardedRef<HTMLFormElement>
) {
  const { options, onSubmit, className, ...otherProps } = props;
  const ctx = useForm(options);
  const formProps = resolveProperties({
    className: [className, ctx.formState.isSubmitting && "loading"],
    disabled: ctx.formState.isSubmitting,
    onSubmit: ctx.handleSubmit((onSubmit && onSubmit(ctx)) || (() => {})),
    ...otherProps,
  });
  return (
    <FormProvider {...ctx}>
      <form {...formProps} ref={ref} />
    </FormProvider>
  );
});

export * from "./TextField";
export * from "./Password";
export * from "./FormErrorField";
