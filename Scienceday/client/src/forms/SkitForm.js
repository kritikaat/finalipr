import React, { useState } from "react";

const SkitForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    participants: Array(6)
      .fill()
      .map(() => ({
        name: "",
        gender: "",
        class: "",
        requiresAccommodation: "",
      })),
    additionalRequirements: "",
    videoLink: "",
    declaration: false,
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // At least one participant is required
    if (!formData.participants[0].name) {
      newErrors.participant1 = "At least one participant is required";
    }

    // Validate filled participant fields
    formData.participants.forEach((participant, index) => {
      if (participant.name) {
        if (!participant.gender) {
          newErrors[`participant${index + 1}Gender`] = "Gender is required";
        }
        if (!participant.class) {
          newErrors[`participant${index + 1}Class`] = "Class is required";
        }
        if (!participant.requiresAccommodation) {
          newErrors[`participant${index + 1}Accommodation`] =
            "Accommodation preference is required";
        }
      }
    });

    if (!formData.videoLink) newErrors.videoLink = "Video link is required";
    if (!formData.declaration)
      newErrors.declaration = "Declaration must be accepted";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const submissionData = {
        participants: formData.participants
          .filter((p) => p.name)
          .map((p) => ({
            name: p.name,
            gender: p.gender,
            class: p.class,
            requiresAccommodation: p.requiresAccommodation,
          })),
        additionalRequirements: formData.additionalRequirements,
        videoLink: formData.videoLink,
        declaration: formData.declaration,
      };
      onSubmit(submissionData);
    }
  };

  const handleParticipantChange = (index, field, value) => {
    const newParticipants = [...formData.participants];
    newParticipants[index] = { ...newParticipants[index], [field]: value };
    setFormData({ ...formData, participants: newParticipants });
  };

  const renderParticipantFields = (index) => {
    const participant = formData.participants[index];
    return (
      <div key={index} className="border-b pb-4 mb-4">
        <h4 className="text-lg font-medium mb-3">Participant {index + 1}</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name {index === 0 && <span className="text-red-500">*</span>}
            </label>
            <input
              type="text"
              value={participant.name}
              onChange={(e) =>
                handleParticipantChange(index, "name", e.target.value)
              }
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <select
              value={participant.gender}
              onChange={(e) =>
                handleParticipantChange(index, "gender", e.target.value)
              }
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Class
            </label>
            <select
              value={participant.class}
              onChange={(e) =>
                handleParticipantChange(index, "class", e.target.value)
              }
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm"
            >
              <option value="">Select Class</option>
              <option value="8th Std.">8th Std.</option>
              <option value="9th Std.">9th Std.</option>
              <option value="10th Std.">10th Std.</option>
              <option value="11th Std.">11th Std.</option>
              <option value="12th Std.">12th Std.</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Requires Accommodation
            </label>
            <select
              value={participant.requiresAccommodation}
              onChange={(e) =>
                handleParticipantChange(
                  index,
                  "requiresAccommodation",
                  e.target.value
                )
              }
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm"
            >
              <option value="">Select Option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
        </div>
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
        {[0, 1, 2, 3, 4, 5].map((index) => renderParticipantFields(index))}

        <div className="mt-6">
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
          />
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">
            Video Link <span className="text-red-500">*</span>
          </label>
          <input
            type="url"
            value={formData.videoLink}
            onChange={(e) =>
              setFormData({ ...formData, videoLink: e.target.value })
            }
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm"
            placeholder="Enter YouTube video link"
          />
          {errors.videoLink && (
            <p className="text-red-500 text-sm mt-1">{errors.videoLink}</p>
          )}
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
              I declare that this skit is original and based on the theme of
              NSD2024
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

export default SkitForm;
