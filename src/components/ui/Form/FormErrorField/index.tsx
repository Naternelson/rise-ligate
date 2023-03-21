import { useFormContext } from "react-hook-form"
import { HelperMessage } from "../TextField"
import "./style.css"

export const FormErrorField = () => {
    const {formState:{errors}} = useFormContext()
    const message = errors["root"]?.message?.toString()
    return <HelperMessage message={message}/>
}