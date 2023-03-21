import { forwardRef, ForwardedRef, PropsWithChildren } from "react";
import { BaseProps, resolveClassName, resolveProperties } from "../ui/Base";

export type IconProps = PropsWithChildren<BaseProps<SVGSVGElement> & {viewBox?: string, width?: string, height?: string}>

export const Icon = forwardRef((props:IconProps, ref:ForwardedRef<SVGSVGElement>) => {
    const {className, ...otherProps} = props 
    const p = {className: resolveClassName(className), ...otherProps}
    
    return <svg {...p} ref={ref}/>
}) 