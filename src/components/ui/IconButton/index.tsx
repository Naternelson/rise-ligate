import { Box, BoxProps } from "../Box";
import "./style.css"
export const IconButton = (props: BoxProps) => {
    return <Box {...props} className={[props.className, "icon-button"]}/>
}