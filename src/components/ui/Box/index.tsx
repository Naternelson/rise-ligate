import { ForwardedRef, forwardRef, PropsWithChildren } from "react"
import { BaseProps, resolveProperties } from "../Base"
import "./style.css"

export type BoxProps = PropsWithChildren<BaseProps<HTMLDivElement>>

export const Box = forwardRef((props:BoxProps, ref: ForwardedRef<HTMLDivElement>) => {
    const divProps = {...resolveProperties(props), children: props.children}
    return <div {...divProps} ref={ref}/>
})

export type InlineProps = PropsWithChildren<BaseProps<HTMLSpanElement>> 

export const Inline = forwardRef((props: InlineProps, ref:ForwardedRef<HTMLSpanElement>) => {
    const spanProps = {...resolveProperties(props), children: props.children}
    return <span {...spanProps} ref={ref}/>
})

