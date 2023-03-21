import { Box, BoxProps } from "../Box"
import "./style.css"

export type ContainerProps = BoxProps & {
    variant?: "auto" | "sm" | "md" | "lg" | "xl" | "xxl"
}

export const Container = (props: ContainerProps) => {
    const {variant, className, ...boxProps} = props
    return  <Box {...boxProps} className={[className,"container", variant ? variant : "auto"]}/>
}