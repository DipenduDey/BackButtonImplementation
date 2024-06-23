import React, { useState, useEffect } from "react";
import {
  RouterProvider,
  Route,
  Routes,
  useNavigate,
  useLocation,
  useBlocker,
  createBrowserRouter,
  createRoutesFromElements,
  Link,
  Outlet,
} from "react-router-dom";
import { confirmDialog } from "primereact/confirmdialog";
import { ConfirmDialog } from "primereact/confirmdialog";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const Home = () => <div>Home Page</div>;
const Page1 = () => <div>Page1</div>;
const Page2 = () => <div>Page2</div>;

const BlockNavigation = () => {
  let blocker = useBlocker(true);

  useEffect(() => {
    if (blocker.state === "blocked") {
      confirmDialog({
        message: "Do you really want to go back?",
        header: "Confirmation",
        icon: "pi pi-exclamation-triangle",
        accept: () => {
          blocker.proceed();
          // navigate(-1);
        },
        reject: () => {
          blocker.reset();
        },
      });
    }
  }, [blocker.state]);

  return null;
};

const Layout = () => {
  return (
    <>
      <ConfirmDialog />
      <BlockNavigation />
      <Link to="/home">home</Link>
      <Link to="/page1">page1</Link>
      <Link to="/page2">page2</Link>
      <Outlet />
    </>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="page1" element={<Page1 />} />
      <Route path="page2" element={<Page2 />} />
    </Route>
  )
);
const App = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
