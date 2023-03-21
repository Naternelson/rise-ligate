import { Form, FormProps } from "../../components/ui/Form"
import {joiResolver} from "@hookform/resolvers/joi"
import { loginSchema, LoginType } from "./schema"
import { TextField } from "../../components/ui/Form/TextField"
import { Password, PasswordGroup } from "../../components/ui/Form/Password"
import { Button } from "../../components/ui/Button"

export const LoginForm = () => {
    const options: FormProps["options"] = { resolver: joiResolver(loginSchema)}
    return <Form options={options}>
        <TextField name="email" label={"Email"}/>
        <PasswordGroup>
            <Password name="password" label={"Password"}/>
        </PasswordGroup>
        <Button type="submit">Login</Button>
    </Form>
}