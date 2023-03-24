import { Outlet } from "react-router-dom"
import { useAuthListener } from "../../components/listeners"
import "./style.css"
import "./theme.css"

export const RootLayout = () => {
    useAuthListener()
    return <Outlet/>
}