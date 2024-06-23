import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  useLocation,
  useBlocker,
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

  let blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      currentLocation.pathname !== nextLocation.pathname
  );

  // useEffect(() => {
  //   const handleWindowClose = (e) => {
  //     e.preventDefault();
  //     e.returnValue = "Do you really want to go back?";
  //     setConfirmNavigation(true);
  //     setLastLocation(location);
  //     return "asdf";
  //   };

  //   window.addEventListener("beforeunload", handleWindowClose);
  //   return () => {
  //     window.removeEventListener("beforeunload", handleWindowClose);
  //   };
  // }, []);

  useEffect(() => {
    if (confirmNavigation) {
      confirmDialog({
        message: "Do you really want to go back?",
        header: "Confirmation",
        icon: "pi pi-exclamation-triangle",
        accept: () => {
          setConfirmNavigation(false);
          navigate(-1);
        },
        reject: () => {
          setConfirmNavigation(false);
        },
      });
    }
  }, [confirmNavigation]);

  return null;
};

const App = () => {
  return (
    <Router>
      <ConfirmDialog />
      <BlockNavigation />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/page1" exact element={<Page1 />} />
        <Route path="/page2" exact element={<Page2 />} />
      </Routes>
    </Router>
  );
};

export default App;
