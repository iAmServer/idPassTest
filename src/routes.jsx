import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Covid from "./pages/Covid";
import Quotes from "./pages/Quotes";
import Names from "./pages/Names";

const Routes = () => {
  const routes = createBrowserRouter([
    { path: "/", exact: true, element: <Quotes /> },
    { path: "/covid", element: <Covid /> },
    { path: "/names", element: <Names /> },
  ]);

  return <RouterProvider router={routes} />;
};

export default Routes;
