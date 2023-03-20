import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAppDispatch } from "../../store";
import { authActions } from "../../store/auth/slice";
import { Box } from "../../components/ui/Box";
export const DashboardLayout = () => {
  const signedIn = useAuthListener();
  const nav = useNavigate();
  if (signedIn === false) nav("/", {replace:true});
  return (
    <>
      {signedIn === "loading" && <Box>Loading...</Box>}
      {signedIn === true && <Outlet />}
    </>
  );
};

const useAuthListener = () => {
  const dispatch = useAppDispatch();
  const [state, setState] = useState<"loading" | boolean>("loading");
  useEffect(() => {
    return onAuthStateChanged(getAuth(), (u) => {
      if (u) {
        dispatch(authActions.signedIn(u.uid));
        setState(true);
      } else {
        dispatch(authActions.signedOff());
        setState(false);
      }
    });
  }, []);
  return state;
};
