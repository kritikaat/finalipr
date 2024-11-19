import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoImage from "./logo.png";

const Register = () => {
  const navigate = useNavigate();
  const initialFormState = {
    schoolName: "",
    email: "",
    address: "",
    cityVillage: "",
    pincode: "",
    affiliationNumber: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [showError, setShowError] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const pincodeRegex = /^\d{6}$/;
    const englishOnly = /^[A-Za-z0-9\s.,#-]*$/;

    if (!formData.schoolName.trim())
      newErrors.schoolName = "School name is required";
    else if (!englishOnly.test(formData.schoolName))
      newErrors.schoolName = "Please enter in English only";

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!emailRegex.test(formData.email))
      newErrors.email = "Invalid email format";

    if (!formData.address.trim()) newErrors.address = "Address is required";
    else if (!englishOnly.test(formData.address))
      newErrors.address = "Please enter in English only";

    if (!formData.cityVillage.trim())
      newErrors.cityVillage = "City/Village is required";
    else if (!englishOnly.test(formData.cityVillage))
      newErrors.cityVillage = "Please enter in English only";

    if (!formData.pincode.trim()) newErrors.pincode = "Pincode is required";
    else if (!pincodeRegex.test(formData.pincode))
      newErrors.pincode = "Pincode must be 6 digits";

    if (!formData.affiliationNumber.trim())
      newErrors.affiliationNumber = "Affiliation number is required";
    else if (!englishOnly.test(formData.affiliationNumber))
      newErrors.affiliationNumber = "Please enter in English only";

    if (!formData.password.trim()) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const capitalizeFirstLetter = (str) => {
    return str.replace(/(?:^|\s)\S/g, (char) => char.toUpperCase());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    // Don't capitalize email and password
    if (name !== 'email' && name !== 'password' && name !== 'pincode') {
      newValue = capitalizeFirstLetter(value);
    }

    // Remove non-English characters except for common punctuation
    if (name !== 'email' && name !== 'password') {
      newValue = newValue.replace(/[^\x00-\x7F\s.,#-]/g, '');
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowError(false);

    if (!validateForm()) {
      setShowError(true);
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors({ submit: data.error || "Registration failed" });
        setShowError(true);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("schoolId", data.school.id);
      navigate("/login");
    } catch (error) {
      setErrors({ submit: error.message || "Error registering school" });
      setShowError(true);
    }
  };

  const renderInput = (name, label, type = "text", placeholder) => (
    <div>
      <label className="text-gray-800 text-lg block">
        {label} <span className="text-red-500">*</span>
      </label>
      <input
        name={name}
        type={type}
        value={formData[name]}
        onChange={handleChange}
        className={`w-full text-sm text-gray-800 border ${
          errors[name] ? "border-red-500" : "border-gray-300"
        } px-4 py-2 rounded-lg outline-blue-600`}
        placeholder={placeholder}
      />
      {errors[name] && (
        <span className="text-red-500 text-sm">{errors[name]}</span>
      )}
    </div>
  );

  return (
    <div className="font-[sans-serif]">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="grid md:grid-cols-2 items-center gap-16 max-w-7xl w-full">
          <div className="border border-gray-300 rounded-lg p-6 max-w-full shadow-xl max-md:mx-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
              {showError && errors.submit && (
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
                  Register your school
                </h3>
              </div>

              {renderInput(
                "schoolName",
                "Name of the School (in English)",
                "text",
                "Enter name of the school"
              )}
              {renderInput(
                "email",
                "Email Address",
                "email",
                "Enter email address"
              )}
              {renderInput(
                "address",
                "Address of the School (in English)",
                "text",
                "Enter address of the school"
              )}

              <div className="flex space-x-4">
                {renderInput(
                  "cityVillage",
                  "City/Village (in English)",
                  "text",
                  "Enter city/village"
                )}
                {renderInput("pincode", "Pincode", "text", "Enter pincode")}
              </div>

              {renderInput(
                "affiliationNumber",
                "Affiliation Number of the School (in English)",
                "text",
                "Enter affiliation number (Gujarat Board/CBSE/ICSC/other)"
              )}
              {renderInput(
                "password",
                "Password",
                "password",
                "Enter password"
              )}

              <div className="!mt-6">
                <button
                  type="submit"
                  className="w-full shadow-xl py-2 font-bold px-4 text-lg tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                >
                  Register
                </button>
              </div>

              <p className="text-sm text-center text-gray-800">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>

          <div className="lg:h-full md:h-full">
            <img
              src="https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7965.jpg"
              className="w-full h-full block object-cover"
              alt="Register"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;