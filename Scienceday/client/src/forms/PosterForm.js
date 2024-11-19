import React, { useState } from "react";

const PosterForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    participant1Name: "",
    participant1Gender: "",
    participant1Class: "",
    participant1Accommodation: "",
    participant2Name: "",
    participant2Gender: "",
    participant2Class: "",
    participant2Accommodation: "",
    declaration: false,
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Participant 1 validation
    if (!formData.participant1Name)
      newErrors.participant1Name = "Name is required";
    if (!formData.participant1Gender)
      newErrors.participant1Gender = "Gender is required";
    if (!formData.participant1Class)
      newErrors.participant1Class = "Class is required";
    if (!formData.participant1Accommodation)
      newErrors.participant1Accommodation =
        "Accommodation preference is required";

    // Participant 2 validation
    if (!formData.participant2Name)
      newErrors.participant2Name = "Name is required";
    if (!formData.participant2Gender)
      newErrors.participant2Gender = "Gender is required";
    if (!formData.participant2Class)
      newErrors.participant2Class = "Class is required";
    if (!formData.participant2Accommodation)
      newErrors.participant2Accommodation =
        "Accommodation preference is required";

    if (!formData.declaration)
      newErrors.declaration = "Declaration must be accepted";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const submissionData = {
        participant1Name: formData.participant1Name,
        participant1Gender: formData.participant1Gender,
        participant1Class: formData.participant1Class,
        participant1Accommodation: formData.participant1Accommodation,
        participant2Name: formData.participant2Name,
        participant2Gender: formData.participant2Gender,
        participant2Class: formData.participant2Class,
        participant2Accommodation: formData.participant2Accommodation,
        declaration: formData.declaration,
      };
      onSubmit(submissionData);
    }
  };

  const renderParticipantFields = (participantNumber) => {
    const prefix = `participant${participantNumber}`;
    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData[`${prefix}Name`]}
            onChange={(e) =>
              setFormData({ ...formData, [`${prefix}Name`]: e.target.value })
            }
            className={`mt-1 block w-full rounded-md border ${
              errors[`${prefix}Name`] ? "border-red-500" : "border-gray-300"
            } shadow-sm`}
          />
          {errors[`${prefix}Name`] && (
            <p className="text-red-500 text-sm mt-1">
              {errors[`${prefix}Name`]}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Gender <span className="text-red-500">*</span>
          </label>
          <select
            value={formData[`${prefix}Gender`]}
            onChange={(e) =>
              setFormData({ ...formData, [`${prefix}Gender`]: e.target.value })
            }
            className={`mt-1 block w-full rounded-md border ${
              errors[`${prefix}Gender`] ? "border-red-500" : "border-gray-300"
            } shadow-sm`}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors[`${prefix}Gender`] && (
            <p className="text-red-500 text-sm mt-1">
              {errors[`${prefix}Gender`]}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Class <span className="text-red-500">*</span>
          </label>
          <select
            value={formData[`${prefix}Class`]}
            onChange={(e) =>
              setFormData({ ...formData, [`${prefix}Class`]: e.target.value })
            }
            className={`mt-1 block w-full rounded-md border ${
              errors[`${prefix}Class`] ? "border-red-500" : "border-gray-300"
            } shadow-sm`}
          >
            <option value="">Select Class</option>
            <option value="8th Std.">8th Std.</option>
            <option value="9th Std.">9th Std.</option>
            <option value="10th Std.">10th Std.</option>
          </select>
          {errors[`${prefix}Class`] && (
            <p className="text-red-500 text-sm mt-1">
              {errors[`${prefix}Class`]}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Requires Accommodation <span className="text-red-500">*</span>
          </label>
          <select
            value={formData[`${prefix}Accommodation`]}
            onChange={(e) =>
              setFormData({
                ...formData,
                [`${prefix}Accommodation`]: e.target.value,
              })
            }
            className={`mt-1 block w-full rounded-md border ${
              errors[`${prefix}Accommodation`]
                ? "border-red-500"
                : "border-gray-300"
            } shadow-sm`}
          >
            <option value="">Select Option</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          {errors[`${prefix}Accommodation`] && (
            <p className="text-red-500 text-sm mt-1">
              {errors[`${prefix}Accommodation`]}
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
        <div className="md:grid md:grid-cols-2 md:gap-6">
          <div className="md:col-span-1">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Participant 1 Details
            </h3>
            {renderParticipantFields(1)}
          </div>
          <div className="md:col-span-1 mt-5 md:mt-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Participant 2 Details
            </h3>
            {renderParticipantFields(2)}
          </div>
        </div>

        <div className="mt-6">
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
              I declare that this poster is hand drawn/painted by me only and
              not computer generated
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
      </div>{" "}
    </form>
  );
};

export default PosterForm;
