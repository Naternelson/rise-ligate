import "./style.css";
/** UI Imports */
import {
  Box,
  Button,
  Divider,
  Form,
  FormErrorField,
  Password,
  PasswordGroup,
  TextField,
} from "../../components/ui";

/** ReactHookForm related imports */
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { loginSchema } from "./schema";
/**Firebase Imports */
import { FirebaseError } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { Container } from "../../components/ui/Container";

export const LoginForm = () => {
  const nav = useNavigate();
  return (
    <Container variant="sm">
      <Form
        id={"login-form"}
        options={{ resolver: joiResolver(loginSchema) }}
        onSubmit={(formContext) => async (data) => {
          signInWithEmailAndPassword(getAuth(), data.email, data.password)
            .then(onSuccess(nav))
            .catch(onError(formContext));
        }}
      >
        <TextField name="email" label={"Email"} />
        <PasswordGroup>
          <Password name="password" label={"Password"} />
        </PasswordGroup>
        <Box>
          <FormErrorField />
          <Divider id={"btn-divider"} />
        </Box>
        <Button fullWidth type="submit">
          Login
        </Button>
      </Form>
    </Container>
  );
};

const onSuccess = (nav: NavigateFunction) => {
  return () => {
    nav("/dashboard");
  };
};

function onError<T extends FieldValues>(formContext: UseFormReturn<T>) {
  return (error: any) => {
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case "auth/user-not-found":
          formContext.setError("email" as Path<T>, {
            type: "firebase",
            message: "Email wasn't found, if needed, please create an account",
          });
          formContext.setFocus("email" as Path<T>);
          break;
        case "auth/wrong-password":
          formContext.setError("password" as Path<T>, {
            type: "firebase",
            message:
              "Password is incorrect, please check your password and try again",
          });
          formContext.setFocus("password" as Path<T>);
          break;
        default:
          formContext.setError("root", {
            type: "firebase",
            message:
              "An unknown error occured, please try again in a few minutes",
          });
      }
    }
  };
}
