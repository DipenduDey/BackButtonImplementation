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
  const [lastLocation, setLastLocation] = useState(null);
  const [confirmNavigation, setConfirmNavigation] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  let blocker = useBlocker(true);

  useEffect(() => {
    const handleWindowClose = (e) => {
      e.preventDefault();
      e.returnValue = "Do you really want to go back?";
      setConfirmNavigation(true);
      setLastLocation(location);
      return "asdf";
    };

    window.addEventListener("beforeunload", handleWindowClose);
    return () => {
      window.removeEventListener("beforeunload", handleWindowClose);
    };
  }, []);

  useEffect(() => {
    if (blocker.state === "blocked") {
      confirmDialog({
        message: "Do you really want to go back?",
        header: "Confirmation",
        icon: "pi pi-exclamation-triangle",
        accept: () => {
          setConfirmNavigation(false);
          blocker.proceed();
          // navigate(-1);
        },
        reject: () => {
          setConfirmNavigation(false);
          blocker.reset();
        },
      });
    }
  }, [blocker.state]);

  return null;
};

const Test = () => {
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
    <Route path="/" element={<Test />}>
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
