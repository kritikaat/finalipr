import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoImage from "./logo.png";

const Login = () => {
  const navigate = useNavigate();
  const initialFormState = {
    email: "",
    password: "",
    rememberMe: false,
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!emailRegex.test(formData.email))
      newErrors.email = "Invalid email format";

    if (!formData.password.trim()) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors({ submit: data.error || "Invalid credentials" });
        return;
      }

      localStorage.setItem("token", data.token);
      navigate("/IPRForm");
    } catch (error) {
      setErrors({ submit: "Error during login. Please try again." });
    }
  };

  const renderInput = (name, label, type = "text", placeholder) => (
    <div>
      <label className="text-gray-800 text-lg mb-2 block">
        {label} <span className="text-red-500">*</span>
      </label>
      <div className="relative flex items-center">
        <input
          name={name}
          type={
            name === "password" ? (showPassword ? "text" : "password") : type
          }
          value={formData[name]}
          onChange={handleChange}
          className={`w-full text-sm text-gray-800 border ${
            errors[name] ? "border-red-500" : "border-gray-300"
          } px-4 py-3 rounded-lg outline-blue-600`}
          placeholder={placeholder}
        />
        {name === "password" && (
          <svg
            onClick={() => setShowPassword(!showPassword)}
            xmlns="http://www.w3.org/2000/svg"
            fill="#bbb"
            viewBox="0 0 24 24"
            stroke="#bbb"
            className="w-5 h-auto absolute right-4 cursor-pointer"
          >
            {showPassword ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={0.5}
                d="M12.01 20c-5.065 0-9.586-4.211-12.01-8.424 2.418-4.103 6.943-7.576 12.01-7.576 5.135 0 9.635 3.453 11.999 7.564-2.241 4.43-6.726 8.436-11.999 8.436zm-10.842-8.416c.843 1.331 5.018 7.416 10.842 7.416 6.305 0 10.112-6.103 10.851-7.405-.772-1.198-4.606-6.595-10.851-6.595-6.116 0-10.025 5.355-10.842 6.584zm10.832-4.584c2.76 0 5 2.24 5 5s-2.24 5-5 5-5-2.24-5-5 2.24-5 5-5zm0 1c2.208 0 4 1.792 4 4s-1.792 4-4 4-4-1.792-4-4 1.792-4 4-4z"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M8.137 15.147c-.71-.857-1.146-1.947-1.146-3.147 0-2.76 2.241-5 5-5 1.201 0 2.291.435 3.148 1.145l1.897-1.897c-1.441-.738-3.122-1.248-5.035-1.248-6.115 0-10.025 5.355-10.842 6.584.529.834 2.379 3.527 5.113 5.428l1.865-1.865zm6.294-6.294c-.673-.53-1.515-.853-2.44-.853-2.207 0-4 1.792-4 4 0 .923.324 1.765.854 2.439l5.586-5.586zm7.56-6.146l-19.292 19.293-.708-.707 3.548-3.548c-2.298-1.612-4.234-3.885-5.548-6.169 2.418-4.103 6.943-7.576 12.01-7.576 2.065 0 4.021.566 5.782 1.501l3.501-3.501.707.707zm-2.465 3.879l-.734.734c2.236 1.619 3.628 3.604 4.061 4.274-.739 1.303-4.546 7.406-10.852 7.406-1.425 0-2.749-.368-3.951-.938l-.748.748c1.475.742 3.057 1.19 4.699 1.19 5.274 0 9.758-4.006 11.999-8.436-1.087-1.891-2.63-3.637-4.474-4.978zm-3.535 5.414c0-.554-.113-1.082-.317-1.562l.734-.734c.361.69.583 1.464.583 2.296 0 2.759-2.24 5-5 5-.832 0-1.604-.223-2.295-.583l.734-.735c.48.204 1.007.318 1.561.318 2.208 0 4-1.792 4-4z"
              />
            )}
          </svg>
        )}
      </div>
      {errors[name] && (
        <span className="text-red-500 text-sm mt-1">{errors[name]}</span>
      )}
    </div>
  );

  return (
    <div className="font-[sans-serif]">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full">
          <div className="border border-gray-300 rounded-lg p-6 max-w-md shadow-xl max-md:mx-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
              {errors.submit && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                  <strong className="font-bold">Error! </strong>
                  <span className="block sm:inline">{errors.submit}</span>
                </div>
              )}

              <header className="bg-gradient-to-r from-white to-gray-50 border-b border-orange-200 shadow-sm">
                <div className="container mx-auto flex items-center justify-between h-20 px-4 md:px-0">
                  <div className="flex items-center space-x-4 group">
                    <div className="w-12 h-12 flex items-center justify-center transform transition-transform group-hover:scale-105">
                      <img
                        src={logoImage}
                        alt="IPR"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex flex-col items-start">
                      <h1 className="text-2xl font-bold text-orange-500 tracking-wide">
                        प्लाज्मा अनुसंधान संस्थान
                      </h1>
                      <h2 className="text-xl font-semibold text-blue-600 tracking-wide">
                        Institute for Plasma Research
                      </h2>
                    </div>
                  </div>
                </div>
              </header>

              <div className="mb-8">
                <h3 className="text-gray-800 text-3xl font-extrabold">
                  Login to your account
                </h3>
              </div>

              {renderInput("email", "User ID", "email", "Enter email")}
              {renderInput(
                "password",
                "Password",
                "password",
                "Enter password"
              )}

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="rememberMe"
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-3 block text-sm text-gray-800"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a
                    href="#"
                    className="text-blue-600 hover:underline font-semibold"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div className="!mt-8">
                <button
                  type="submit"
                  className="w-full shadow-xl py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                >
                  Log in
                </button>
              </div>

              <p className="text-sm !mt-8 text-center text-gray-800">
                Don't have an account?
                <Link
                  to="/"
                  className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap"
                >
                  Register here
                </Link>
              </p>
            </form>
          </div>

          <div className="lg:h-full md:h-full max-md:mt-8">
            <img
              src="https://readymadeui.com/login-image.webp"
              className="w-full h-full max-md:w-4/5 mx-auto block object-cover"
              alt="Login"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
