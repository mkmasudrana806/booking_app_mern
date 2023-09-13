import { useContext } from "react";
import { UserContext } from "../context/UserContextProvider";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const AccountPage = () => {
  const { user, loading, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  // use params to collect route subpage and used in active class
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  // user logout handler
  const logout = async () => {
    try {
      await axios.post("/user/logout");
      navigate("/");
      setUser({ user, name: "masud" });
    } catch (error) {
      console.log("Error while logout", error);
    }
  };

  // avoid initial loading state return a value
  if (loading) {
    return "loading...";
  }

  // button active styling using class handler
  function linkClasses(type = null) {
    let classes = "py-2 px-6  ";
    if (type === subpage) {
      classes += "bg-primary text-white rounded-full ";
    }
    return classes;
  }

  //   if (loading) {
  //     return "Loading...";
  //   }

  // if(!loading && !user){
  //     return <Navigate to={'/login'} />
  // }

  return (
    <div>
      <nav className="w-full flex justify-center my-8 gap-2">
        <Link className={linkClasses("profile")} to={"/account"}>
          My Profile
        </Link>
        <Link className={linkClasses("bookings")} to={"/account/bookings"}>
          My bookings
        </Link>
        <Link className={linkClasses("places")} to={"/account/places"}>
          My accomodations
        </Link>
      </nav>
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user?.name} ( {user?.email} ) <br />
          <button onClick={logout} className="primary max-w-sm mt-2">
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default AccountPage;
