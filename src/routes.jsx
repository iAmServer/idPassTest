import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Catalog from "./pages/Catalog";
import Cart from "./pages/Cart";

const Routes = () => {
  const routes = createBrowserRouter([
    { path: "/", exact: true, element: <Catalog /> },
    { path: "/cart", element: <Cart /> },
  ]);

  return <RouterProvider router={routes} />;
};

export default Routes;
