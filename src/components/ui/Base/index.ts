import { CSSProperties, DetailedHTMLProps, forwardRef, HTMLAttributes, MouseEventHandler, PropsWithChildren } from "react"

export type ClassName = string | Array<string | false | undefined | ClassName> 
export type BaseProps <T extends HTMLElement> ={
    className?: ClassName
    style?: CSSProperties,
    id?: string,
    onHover?: string,
    onClick?: MouseEventHandler<T>, 
}

export const resolveProperties = <T extends HTMLElement, P extends BaseProps<T>>(props: P):DetailedHTMLProps<HTMLAttributes<T>,T> => {
  const {className, onHover, ...baseProps} = props 
  return {
    ...baseProps,
    ...resolveHover(onHover),
    className: resolveClassName(className)
  }
}



const resolveClassName = (className?: ClassName) => {
    return [className].flat().filter(el => !!el).join(" ")
}

interface HoverEventHandler<T extends HTMLElement> {
    onMouseEnter?: MouseEventHandler<T>,
    onMouseLeave?: MouseEventHandler<T>, 
}

const resolveHover = <T extends HTMLElement>(
  hover?: string
): HoverEventHandler<T> => {
  if (!hover) return {};
  return{
    onMouseEnter: (e) => e.currentTarget.classList.add(hover),
    onMouseLeave: (e) => e.currentTarget.classList.remove(hover)
  }
};