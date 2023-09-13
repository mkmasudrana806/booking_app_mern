import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContextProvider";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (redirect) {
      navigate("/");
    }
  }, [redirect, navigate]);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await axios
        .post("/user/login", { email, password })
        .then((res) => setUser(res.data));
      alert("login successful");
      setRedirect(true);
    } catch (error) {
      alert("login fiald!");
    }
  };

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-32">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form onSubmit={handleLogin} className="max-w-md mx-auto">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="your@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="primary">Login</button>
          <p className="text-center py-2 text-gray-500">
            Don`t have an Account yet?{" "}
            <Link to={"/register"}>
              <span className="underline font-bold">Register</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
