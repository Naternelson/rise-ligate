import { createBrowserRouter } from "react-router-dom";
import { DashboardLayout } from "../layouts/dashboard";
import { RootLayout } from "../layouts/root";
import { Dashboard } from "../pages/dashboard";
import { HomePage } from "../pages/home";

export const router = createBrowserRouter([
  {
    path: "/",
    id: "ROOT",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      }
    ],
  }, {
    path: "/dashboard",
    element: <DashboardLayout/>,
    children: [
        {
            index: true,
            element: <Dashboard/>
        }
    ]
  }
]);
