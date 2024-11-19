import React, { useState, useEffect } from "react";

const SchoolDetailsForm = ({ onComplete }) => {
  const [formData, setFormData] = useState({
    coordinatorName: "",
    coordinatorMobile: "",
    schoolName: "",
    schoolAddress: "",
    cityVillage: "",
    pincode: "",
    affiliationNumber: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [hasExistingData, setHasExistingData] = useState(false);

  // Fetch school details when component mounts
  useEffect(() => {
    fetchSchoolDetails();
  }, []);

  const fetchSchoolDetails = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:4000/api/schools/1", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      });

      if (response.ok) {
        const schoolData = await response.json();
        // Map backend data to form fields
        setFormData({
          coordinatorName: schoolData.coordinatorTeacherName || "",
          coordinatorMobile: schoolData.coordinatorTeacherMobile || "",
          schoolName: schoolData.name || "",
          schoolAddress: schoolData.address || "",
          cityVillage: schoolData.city || "",
          pincode: schoolData.pincode || "",
          affiliationNumber: schoolData.affiliationNumber || "",
        });
        setHasExistingData(true);
      } else {
        setHasExistingData(false);
      }
    } catch (error) {
      console.error("Error fetching school details:", error);
      setHasExistingData(false);
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const mobileRegex = /^[0-9]{10}$/;
    const pincodeRegex = /^[0-9]{6}$/;

    if (!formData.coordinatorName.trim())
      newErrors.coordinatorName = "Coordinator name is required";
    if (!formData.coordinatorMobile.trim())
      newErrors.coordinatorMobile = "Mobile number is required";
    else if (!mobileRegex.test(formData.coordinatorMobile))
      newErrors.coordinatorMobile = "Invalid mobile number";
    if (!formData.schoolName.trim())
      newErrors.schoolName = "School name is required";
    if (!formData.schoolAddress.trim())
      newErrors.schoolAddress = "School address is required";
    if (!formData.cityVillage.trim())
      newErrors.cityVillage = "City/Village is required";
    if (!formData.pincode.trim()) 
      newErrors.pincode = "Pincode is required";
    else if (!pincodeRegex.test(formData.pincode))
      newErrors.pincode = "Invalid pincode";
    if (!formData.affiliationNumber.trim())
      newErrors.affiliationNumber = "Affiliation number is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const url = hasExistingData ? 
          "http://localhost:4000/api/schools/1" : 
          "http://localhost:4000/api/schools";
        
        const method = hasExistingData ? "PUT" : "POST";

        const response = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            coordinatorTeacherName: formData.coordinatorName,
            coordinatorTeacherMobile: formData.coordinatorMobile,
            name: formData.schoolName,
            address: formData.schoolAddress,
            city: formData.cityVillage,
            pincode: formData.pincode,
            affiliationNumber: formData.affiliationNumber,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          if (isEditing) {
            setIsEditing(false);
            alert("School details updated successfully!");
          } else {
            onComplete(data);
          }
        } else {
          setErrors({ submit: data.error || "Failed to submit form" });
        }
      } catch (error) {
        setErrors({ submit: "Network error or server is not responding" });
      }
    }
  };

  const renderField = (name, label, type = "text", helperText = "") => (
    <div className="mb-6">
      <label className="block mb-1 font-semibold">
        {label} <span className="text-red-500">*</span>
      </label>
      <input
        type={type}
        value={formData[name]}
        onChange={(e) => setFormData({ ...formData, [name]: e.target.value })}
        disabled={hasExistingData && !isEditing && !isLoading}
        className={`w-full p-2 border ${
          errors[name] ? "border-red-500" : "border-gray-300"
        } rounded ${hasExistingData && !isEditing && !isLoading ? "bg-gray-100" : ""}`}
      />
      {helperText && <p className="text-sm text-gray-500">{helperText}</p>}
      {errors[name] && <p className="text-sm text-red-500">{errors[name]}</p>}
    </div>
  );

  if (isLoading) {
    return <div className="text-center py-4">Loading school details...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">School Details</h2>
        {hasExistingData && !isEditing && (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Edit Details
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {renderField(
          "coordinatorName",
          "Name of the School Coordinator Teacher:",
          "text",
          "Any communication related to NSD2024 shall be done by this teacher only"
        )}
        {renderField(
          "coordinatorMobile",
          "Mobile Number of the School Coordinator Teacher:"
        )}
        {renderField("schoolName", "Name of the School:")}
        {renderField("schoolAddress", "Address of the School:")}
        {renderField("cityVillage", "City/village of the School:")}
        {renderField("pincode", "Pincode:")}
        {renderField(
          "affiliationNumber",
          "Affiliation Number of the School:",
          "text",
          "Enter Gujarat Board/CBSE/ICSC/other board registration number"
        )}

<div className="flex items-end mt-4 justify-between">
  {isEditing ? (
    <>
      <button
        type="submit"
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Save Changes
      </button>
      <button
        type="button"
        onClick={() => {
          setIsEditing(false);
          fetchSchoolDetails();
        }}
        className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
      >
        Cancel
      </button>
    </>
  ) : (
    <button
      type="submit"
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      Next
    </button>
  )}
</div>

        {errors.submit && (
          <p className="text-sm text-red-500 mt-4">{errors.submit}</p>
        )}
      </form>
    </div>
  );
};

export default SchoolDetailsForm;