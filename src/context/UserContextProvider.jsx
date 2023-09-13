import axios from "axios";
import { createContext, useEffect, useState } from "react";
export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // hold the user state
  useEffect(() => {
    if (!user) {
      axios.get("/user/profile").then((res) => {
        setUser(res.data);
        setLoading(false);
      });
    }
  }, [user, setUser]);

  const userInfo = {
    user,
    setUser,
    loading,
  };
  return (
    <div>
      <UserContext.Provider value={userInfo}>{children}</UserContext.Provider>
    </div>
  );
};

export default UserContextProvider;
