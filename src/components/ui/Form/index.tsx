import { ForwardedRef, forwardRef, PropsWithChildren } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { BaseProps, resolveProperties } from "../Base";

export type FormProps = PropsWithChildren<BaseProps<HTMLFormElement> & {
    options: Parameters<typeof useForm>[0]
}>

export const Form = forwardRef((props:FormProps, ref:ForwardedRef<HTMLFormElement>) => {
    const {options,...otherProps} = props
    const ctx = useForm(options)
    const formProps = resolveProperties(otherProps);
    return (
      <FormProvider {...ctx}>
        <form {...formProps} ref={ref} />
      </FormProvider>
    );
})