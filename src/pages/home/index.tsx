import { Box } from "../../components/ui/Box";
import { LoginForm } from "../../partials/LoginForm";
import "./style.css";

export const HomePage = () => {
  return (
    <Box className={"full-page center col"} id="main">
      <h1>Shadow</h1>
      <LoginForm/>
    </Box>
  );
};
