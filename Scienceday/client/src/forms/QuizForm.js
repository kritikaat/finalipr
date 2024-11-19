import React, { useState, useEffect } from 'react';

const UnifiedQuizForm = () => {
  const [formData, setFormData] = useState({
    participant1Name: '',
    participant1Gender: '',
    participant1Class: '',
    participant1Accommodation: '',
    participant2Name: '',
    participant2Gender: '',
    participant2Class: '',
    participant2Accommodation: '',
    declaration: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const schoolId = localStorage.getItem('schoolId');
        const response = await fetch(`http://localhost:4000/api/quizzes/1`);
        
        if (response.ok) {
          const data = await response.json();
          // If data exists, populate the form
          if (data && Object.keys(data).length > 0) {
            setFormData({
              participant1Name: data.participant1Name || '',
              participant1Gender: data.participant1Gender || '',
              participant1Class: data.participant1Class || '',
              participant1Accommodation: data.participant1Accommodation || '',
              participant2Name: data.participant2Name || '',
              participant2Gender: data.participant2Gender || '',
              participant2Class: data.participant2Class || '',
              participant2Accommodation: data.participant2Accommodation || '',
              declaration: data.declaration || false
            });
            setLastUpdated(data.updatedAt);
          }
        } else if (response.status === 404) {
          // No data exists - form will remain with empty fields
          console.log('No existing data found - new entry will be created');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const schoolId = localStorage.getItem('schoolId');
        const isNew = !lastUpdated; // Check if this is a new entry

        const response = await fetch(
          `http://localhost:4000/api/quizzes/1`,
          {
            method: isNew ? 'POST' : 'PUT', // Use POST for new entries, PUT for updates
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ...formData,
              schoolId: parseInt(schoolId),
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          setLastUpdated(data.updatedAt);
          alert(isNew ? 'Data saved successfully!' : 'Data updated successfully!');
        } else {
          const errorData = await response.json();
          setErrors({ submit: errorData.error || `Failed to ${isNew ? 'save' : 'update'} quiz` });
        }
      } catch (error) {
        console.error('Operation error:', error);
        setErrors({ submit: 'Network error or server is not responding' });
      }
    }
  };

  // Rest of the component remains the same (validateForm, renderParticipantFields, etc.)
  const validateForm = () => {
    const newErrors = {};

    if (!formData.participant1Name) newErrors.participant1Name = "Name is required";
    if (!formData.participant1Gender) newErrors.participant1Gender = "Gender is required";
    if (!formData.participant1Class) newErrors.participant1Class = "Class is required";
    if (!formData.participant1Accommodation) 
      newErrors.participant1Accommodation = "Accommodation preference is required";

    if (
      formData.participant2Name ||
      formData.participant2Gender ||
      formData.participant2Class ||
      formData.participant2Accommodation
    ) {
      if (!formData.participant2Name)
        newErrors.participant2Name = "Name is required if adding second participant";
      if (!formData.participant2Gender)
        newErrors.participant2Gender = "Gender is required if adding second participant";
      if (!formData.participant2Class)
        newErrors.participant2Class = "Class is required if adding second participant";
      if (!formData.participant2Accommodation)
        newErrors.participant2Accommodation = "Accommodation preference is required if adding second participant";
    }

    if (!formData.declaration) newErrors.declaration = "Declaration must be accepted";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const renderParticipantFields = (participantNumber, isOptional = false) => {
    const prefix = `participant${participantNumber}`;
    return (
      <div className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">
            Name {!isOptional && <span className="text-red-500">*</span>}
          </label>
          <input
            type="text"
            value={formData[`${prefix}Name`]}
            onChange={(e) =>
              setFormData({ ...formData, [`${prefix}Name`]: e.target.value })
            }
            className={`w-full p-2 border ${
              errors[`${prefix}Name`] ? 'border-red-500' : 'border-gray-300'
            } rounded`}
          />
          {errors[`${prefix}Name`] && (
            <p className="text-sm text-red-500">{errors[`${prefix}Name`]}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-semibold">
            Gender {!isOptional && <span className="text-red-500">*</span>}
          </label>
          <select
            value={formData[`${prefix}Gender`]}
            onChange={(e) =>
              setFormData({ ...formData, [`${prefix}Gender`]: e.target.value })
            }
            className={`w-full p-2 border ${
              errors[`${prefix}Gender`] ? 'border-red-500' : 'border-gray-300'
            } rounded`}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors[`${prefix}Gender`] && (
            <p className="text-sm text-red-500">{errors[`${prefix}Gender`]}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-semibold">
            Class {!isOptional && <span className="text-red-500">*</span>}
          </label>
          <select
            value={formData[`${prefix}Class`]}
            onChange={(e) =>
              setFormData({ ...formData, [`${prefix}Class`]: e.target.value })
            }
            className={`w-full p-2 border ${
              errors[`${prefix}Class`] ? 'border-red-500' : 'border-gray-300'
            } rounded`}
          >
            <option value="">Select Class</option>
            <option value="8th Std.">8th Std.</option>
            <option value="9th Std.">9th Std.</option>
            <option value="10th Std.">10th Std.</option>
          </select>
          {errors[`${prefix}Class`] && (
            <p className="text-sm text-red-500">{errors[`${prefix}Class`]}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-semibold">
            Requires Accommodation{" "}
            {!isOptional && <span className="text-red-500">*</span>}
          </label>
          <select
            value={formData[`${prefix}Accommodation`]}
            onChange={(e) =>
              setFormData({
                ...formData,
                [`${prefix}Accommodation`]: e.target.value,
              })
            }
            className={`w-full p-2 border ${
              errors[`${prefix}Accommodation`] ? 'border-red-500' : 'border-gray-300'
            } rounded`}
          >
            <option value="">Select Option</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          {errors[`${prefix}Accommodation`] && (
            <p className="text-sm text-red-500">
              {errors[`${prefix}Accommodation`]}
            </p>
          )}
        </div>
      </div>
    );
  };

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {lastUpdated && (
        <div className="text-sm text-gray-600">
          Last Updated: {new Date(lastUpdated).toLocaleString()}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {errors.submit && (
          <div className="p-3 bg-red-100 text-red-700 rounded mb-4">
            {errors.submit}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Participant 1</h3>
            {renderParticipantFields(1)}
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">
              Participant 2 (Optional)
            </h3>
            {renderParticipantFields(2, true)}
          </div>
        </div>

        <div className="mt-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.declaration}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  declaration: e.target.checked,
                })
              }
              className="mr-2"
            />
            <span>
              I declare that we will present Quiz ourselves and will not take help of others
            </span>
          </label>
          {errors.declaration && (
            <p className="text-sm text-red-500 mt-1">
              {errors.declaration}
            </p>
          )}
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {lastUpdated ? 'Save Changes' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UnifiedQuizForm;