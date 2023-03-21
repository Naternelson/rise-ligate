import { ForwardedRef, forwardRef, PropsWithChildren } from "react";
import { FieldValues, FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { BaseProps, resolveProperties } from "../Base";

export type FormProps = PropsWithChildren<BaseProps<HTMLFormElement> & {
    options?: Parameters<typeof useForm>[0],
    onSubmit?: SubmitHandler<FieldValues>
}>

export const Form = forwardRef(function(props:FormProps, ref:ForwardedRef<HTMLFormElement>) {
    const {options, onSubmit, ...otherProps} = props
    const ctx = useForm(options)
    const formProps = resolveProperties(otherProps);
    return (
      <FormProvider {...ctx}>
        <form {...formProps} onSubmit={ctx.handleSubmit(onSubmit || (() => {}))} ref={ref} />
      </FormProvider>
    );
})