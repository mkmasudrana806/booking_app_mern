import axios from "axios";
import Header from "../Header";
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContextProvider";

// axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.baseURL = "http://127.0.0.1:5000";
axios.defaults.withCredentials = true;

const Main = () => {
  const { user } = useContext(UserContext);
  console.log("current user", user);
  return (
    <div className="p-4 flex flex-col min-h-screen">
      <Header />
      <Outlet />
    </div>
  );
};

export default Main;
