import React, { useState } from "react";

const TeacherModelForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    teacherName: "",
    gender: "",
    requiresAccommodation: "",
    additionalRequirements: "",
    writeup: null,
    declaration: false,
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.teacherName) newErrors.teacherName = "Name is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.requiresAccommodation)
      newErrors.requiresAccommodation = "Accommodation preference is required";
    if (!formData.writeup) newErrors.writeup = "Writeup PDF is required";
    if (!formData.declaration)
      newErrors.declaration = "Declaration must be accepted";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const submissionData = {
        teacherName: formData.teacherName,
        gender: formData.gender,
        requiresAccommodation: formData.requiresAccommodation,
        additionalRequirements: formData.additionalRequirements,
        writeup: formData.writeup,
        declaration: formData.declaration,
      };
      onSubmit(submissionData);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf" && file.size <= 1024 * 1024) {
      setFormData({ ...formData, writeup: file });
      setErrors({ ...errors, writeup: "" });
    } else {
      setErrors({ ...errors, writeup: "Please upload a PDF file under 1MB" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Teacher Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.teacherName}
              onChange={(e) =>
                setFormData({ ...formData, teacherName: e.target.value })
              }
              className={`mt-1 block w-full rounded-md border ${
                errors.teacherName ? "border-red-500" : "border-gray-300"
              } shadow-sm`}
            />
            {errors.teacherName && (
              <p className="text-red-500 text-sm mt-1">{errors.teacherName}</p>
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
              Additional Requirements
            </label>
            <textarea
              value={formData.additionalRequirements}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  additionalRequirements: e.target.value,
                })
              }
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm"
              rows={3}
              placeholder="Enter any additional requirements"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Upload Writeup (PDF, max 1MB){" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="mt-1 block w-full"
            />
            {errors.writeup && (
              <p className="text-red-500 text-sm mt-1">{errors.writeup}</p>
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
              I declare that this teacher's model is prepared by me and not by
              others
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

export default TeacherModelForm;
