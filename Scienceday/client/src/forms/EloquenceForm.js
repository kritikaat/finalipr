import React, { useState } from "react";

const EloquenceForm = ({ onSubmit, language }) => {
  const [formData, setFormData] = useState({
    participantName: "",
    gender: "",
    class: "",
    requiresAccommodation: "",
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
    if (!formData.declaration)
      newErrors.declaration = "Declaration must be accepted";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const submissionData = {
        participantName: formData.participantName,
        participantGender: formData.gender,
        participantClass: formData.class,
        accommodationRequired: formData.requiresAccommodation,
        declaration: formData.declaration,
        language: language, // Passed as prop
      };
      onSubmit(submissionData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name <span className="text-red-500">*</span>
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
              I declare that I will present my speech in {language} in my own
              voice
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

export default EloquenceForm;
