import { Box, BoxProps } from "../Box"
import "./style.css"

export const Divider = (props:BoxProps) => {
    return <Box {...props} className={[props.className, "divider"]} />
}