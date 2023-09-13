import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (event) => {
    event.preventDefault();
    axios
      .post("user/register", { name, email, password })
      .then((res) => console.log("response data", res))
      .catch((error) =>
        console.log("error in client response of register route", error)
      );
  };

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-32">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form onSubmit={handleRegister} className="max-w-md mx-auto">
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Masud Rana"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <button type="submit" className="primary">
            Register
          </button>
          <p className="text-center py-2 text-gray-500">
            Already have an Account?{" "}
            <Link to={"/login"}>
              <span className="underline font-bold">Login</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
