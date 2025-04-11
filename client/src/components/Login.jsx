import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Login = () => {
  const { setShowUserLogin, setUser, axios, navigate } = useAppContext();

  const [state, setState] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Password strength and validation
  const passwordValid = () => {
    return (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /\d/.test(password) &&
      /[!@#$%^&*(),.?":{}|<>]/.test(password)
    );
  };

  const isEmailValid = (email) => {
    return email.includes("@") && email.endsWith(".com");
  };

  const getPasswordStrength = (password) => {
    if (password.length < 8) return "Weak";
    if (passwordValid()) return "Strong";
    return "Medium";
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!isEmailValid(email)) {
      toast.error("Email must include '@' and end with '.com'");
      return;
    }

    if (state === "register") {
      if (password !== confirmPassword) {
        toast.error("Passwords do not match!");
        return;
      }
      if (!passwordValid()) {
        toast.error("Password must be 8+ characters with uppercase, lowercase, number, and special character.");
        return;
      }
    }

    try {
      const { data } = await axios.post(`/api/user/${state}`, {
        name,
        email,
        password,
      });

      if (data.success) {
        navigate("/");
        setUser(data.user);
        setShowUserLogin(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      onClick={() => setShowUserLogin(false)}
      className="fixed top-0 bottom-0 left-0 right-0 z-30 flex items-center justify-center text-sm text-gray-600 bg-black/50 backdrop-blur-sm"
    >
      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        className="animate-fadeIn flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white"
      >
        <p className="text-2xl font-medium m-auto">
          <span className="text-primary">User</span> {state === "login" ? "Login" : "Sign Up"}
        </p>

        {state === "register" && (
          <div className="w-full">
            <p>Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="type here"
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
              type="text"
              required
            />
          </div>
        )}

        <div className="w-full">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="type here"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
            type="email"
            required
          />
          {state === "register" && !isEmailValid(email) && (
            <p className="text-red-500 text-xs mt-1">Must include '@' and end with '.com'</p>
          )}
        </div>

        <div className="w-full">
          <p>Password</p>
          <div className="relative">
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="type here"
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary pr-10"
              type={showPassword ? "text" : "password"}
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-3.5 right-3 text-sm text-primary cursor-pointer select-none"
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          {state === "register" && (
            <>
              <p className="mt-1 text-xs">
                Strength:{" "}
                <span
                  className={`font-semibold ${
                    getPasswordStrength(password) === "Strong"
                      ? "text-green-600"
                      : getPasswordStrength(password) === "Medium"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {getPasswordStrength(password)}
                </span>
              </p>
              {!passwordValid() && (
                <ul className="text-xs mt-1 text-gray-500 list-disc pl-4">
                  <li>Minimum 8 characters</li>
                  <li>At least 1 uppercase letter</li>
                  <li>At least 1 lowercase letter</li>
                  <li>At least 1 number</li>
                  <li>At least 1 special character</li>
                </ul>
              )}
            </>
          )}
        </div>

        {state === "register" && (
          <div className="w-full">
            <p>Confirm Password</p>
            <input
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              placeholder="retype password"
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
              type={showPassword ? "text" : "password"}
              required
            />
            {confirmPassword && confirmPassword !== password && (
              <p className="text-red-500 text-xs mt-1">Passwords do not match</p>
            )}
          </div>
        )}

        {state === "register" ? (
          <p>
            Already have account?{" "}
            <span onClick={() => setState("login")} className="text-primary cursor-pointer">
              click here
            </span>
          </p>
        ) : (
          <p>
            Create an account?{" "}
            <span onClick={() => setState("register")} className="text-primary cursor-pointer">
              click here
            </span>
          </p>
        )}

        <button className="bg-primary hover:bg-primary-dull transition-all text-white w-full py-2 rounded-md cursor-pointer">
          {state === "register" ? "Create Account" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
