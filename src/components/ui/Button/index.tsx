import { FormEventHandler, ForwardedRef, forwardRef, PropsWithChildren } from "react";
import { BaseProps, resolveProperties } from "../Base";
import "./style.css"

export type ButtonProps = PropsWithChildren<BaseProps<HTMLButtonElement> & {
    type?: "button" | "submit" | "reset",
    onSumbit?: FormEventHandler<HTMLButtonElement>,
    fullWidth?: boolean
}> 

export const Button = forwardRef((props:ButtonProps, ref:ForwardedRef<HTMLButtonElement>) => {
    const className = [props.className, props.fullWidth && "full-width"].flat()  
    const buttonProps = {...resolveProperties({...props, className})}
    return <button {...buttonProps} ref={ref}/>
})