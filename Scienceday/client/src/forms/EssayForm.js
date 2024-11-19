import React, { useState } from "react";

const EssayForm = ({ onSubmit, language }) => {
  const [formData, setFormData] = useState({
    participantName: "",
    gender: "",
    class: "",
    requiresAccommodation: "",
    essayFile: null,
    declaration: false,
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.participantName)
      newErrors.participantName = "Name is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.class) newErrors.class = "Class is required";
    if (!formData.requiresAccommodation)
      newErrors.requiresAccommodation = "Accommodation preference is required";
    if (!formData.essayFile) newErrors.essayFile = "Essay file is required";
    if (!formData.declaration)
      newErrors.declaration = "Declaration must be accepted";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf" && file.size <= 1024 * 1024) {
      setFormData({ ...formData, essayFile: file });
      setErrors({ ...errors, essayFile: "" });
    } else {
      setErrors({ ...errors, essayFile: "Please upload a PDF file under 1MB" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const schoolId = localStorage.getItem("schoolId");
      const formDataToSend = new FormData();

      formDataToSend.append("participantName", formData.participantName);
      formDataToSend.append("participantGender", formData.gender);
      formDataToSend.append("participantClass", formData.class);
      formDataToSend.append(
        "accommodationRequired",
        formData.requiresAccommodation
      );
      formDataToSend.append("essayFileUrl", formData.essayFile);
      formDataToSend.append("declaration", formData.declaration);
      formDataToSend.append("schoolId", schoolId);

      try {
        const response = await fetch(
          `http://localhost:4000/api/essay/${language.toLowerCase()}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: formDataToSend,
          }
        );

        if (response.ok) {
          const data = await response.json();
          onSubmit(data);
        } else {
          const error = await response.json();
          throw new Error(error.message || "Submission failed");
        }
      } catch (error) {
        setErrors({ submit: error.message });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Participant Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.participantName}
              onChange={(e) =>
                setFormData({ ...formData, participantName: e.target.value })
              }
              className={`mt-1 block w-full rounded-md border ${
                errors.participantName ? "border-red-500" : "border-gray-300"
              } shadow-sm`}
            />
            {errors.participantName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.participantName}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Gender <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.gender}
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
              }
              className={`mt-1 block w-full rounded-md border ${
                errors.gender ? "border-red-500" : "border-gray-300"
              } shadow-sm`}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Class <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.class}
              onChange={(e) =>
                setFormData({ ...formData, class: e.target.value })
              }
              className={`mt-1 block w-full rounded-md border ${
                errors.class ? "border-red-500" : "border-gray-300"
              } shadow-sm`}
            >
              <option value="">Select Class</option>
              <option value="8th Std.">8th Std.</option>
              <option value="9th Std.">9th Std.</option>
              <option value="10th Std.">10th Std.</option>
              <option value="11th Std.">11th Std.</option>
              <option value="12th Std.">12th Std.</option>
            </select>
            {errors.class && (
              <p className="text-red-500 text-sm mt-1">{errors.class}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Requires Accommodation <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.requiresAccommodation}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  requiresAccommodation: e.target.value,
                })
              }
              className={`mt-1 block w-full rounded-md border ${
                errors.requiresAccommodation
                  ? "border-red-500"
                  : "border-gray-300"
              } shadow-sm`}
            >
              <option value="">Select Option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            {errors.requiresAccommodation && (
              <p className="text-red-500 text-sm mt-1">
                {errors.requiresAccommodation}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Upload Essay (PDF, max 1MB){" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="mt-1 block w-full"
            />
            {errors.essayFile && (
              <p className="text-red-500 text-sm mt-1">{errors.essayFile}</p>
            )}
          </div>

          <div className="flex items-start">
            <input
              type="checkbox"
              checked={formData.declaration}
              onChange={(e) =>
                setFormData({ ...formData, declaration: e.target.checked })
              }
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">
              I declare that this essay is hand written by me only and not
              copied from any source
            </label>
          </div>
          {errors.declaration && (
            <p className="text-red-500 text-sm mt-1">{errors.declaration}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Save and Continue
        </button>
      </div>
    </form>
  );
};

export default EssayForm;
