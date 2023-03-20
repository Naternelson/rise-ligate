import { ChangeEventHandler, FocusEventHandler, ForwardedRef, forwardRef, useContext } from "react";
import { useFormContext, UseFormRegisterReturn } from "react-hook-form";
import { BaseProps } from "../../Base";

type BaseFieldProps = UseFormRegisterReturn
export type TextFieldProps = BaseProps<HTMLInputElement> & Partial<BaseFieldProps> & {name: string};

export const TextField = (props:TextFieldProps) => {
    const {name} = props 
    const {register} = useFormContext()
    const p = register(name) 

}

export const InputField = forwardRef((props:BaseFieldProps,ref:ForwardedRef<HTMLInputElement>) => {
    return <input {...props} ref={ref}/>
})
