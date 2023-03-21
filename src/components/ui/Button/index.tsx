import { FormEventHandler, ForwardedRef, forwardRef, PropsWithChildren } from "react";
import { BaseProps, resolveProperties } from "../Base";
import "./style.css"

export type ButtonProps = PropsWithChildren<BaseProps<HTMLButtonElement> & {
    type?: "button" | "submit" | "reset",
    onSumbit?: FormEventHandler<HTMLButtonElement>,
    fullWidth?: boolean,
    variant?: "outline" | "filled",
    color?: "primary" | "secondary" | "accent"
}> 

export const Button = forwardRef((props:ButtonProps, ref:ForwardedRef<HTMLButtonElement>) => {
    const {className, fullWidth, variant, color, ...bProps} = props
    const cName = [props.className,fullWidth && "full-width", variant ? variant : "filled", color ? color : "primary"].flat()  
    const buttonProps = {...resolveProperties({...bProps, className:cName})}
    return <button {...buttonProps} ref={ref}/>
})