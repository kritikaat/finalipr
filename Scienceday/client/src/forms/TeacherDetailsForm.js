import React, { useState, useEffect } from "react";

const TeacherDetailsForm = ({ onComplete }) => {
  const [teachers, setTeachers] = useState([]);
  const [formData, setFormData] = useState({
    teacherName: "",
    gender: "",
    requiresAccommodation: "",
  });
  const [errors, setErrors] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchTeachers = async () => {
    try {
      const schoolId = localStorage.getItem("schoolId");
      const response = await fetch(
        `http://localhost:4000/api/school/${schoolId}/accompanying-teachers`
      );

      if (response.ok) {
        const data = await response.json();
        setTeachers(data);
        const mostRecentUpdate = data.reduce((latest, teacher) => {
          const teacherDate = new Date(teacher.updatedAt);
          return latest ? (teacherDate > new Date(latest) ? teacherDate : latest) : teacherDate;
        }, null);
        setLastUpdated(mostRecentUpdate);
      } else {
        setErrors({ fetch: "Failed to fetch teachers" });
      }
    } catch (error) {
      setErrors({ fetch: "Network error while fetching teachers" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        const schoolId = localStorage.getItem("schoolId");
        const url = editingId 
          ? `http://localhost:4000/api/accompanying-teacher/${editingId}`
          : `http://localhost:4000/api/accompanying-teacher`;
        
        const response = await fetch(url, {
          method: editingId ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.teacherName,
            gender: formData.gender,
            requiresAccommodation: formData.requiresAccommodation,
            schoolId: parseInt(schoolId),
          }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          await fetchTeachers();
          handleCancel();
          onComplete();
        } else {
          setErrors({ submit: data.error || `Failed to ${editingId ? 'update' : 'create'} teacher` });
        }
      } catch (error) {
        setErrors({ submit: "Network error or server is not responding" });
      }
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.teacherName.trim()) newErrors.teacherName = "Teacher name is required";
    if (!formData.gender) newErrors.gender = "Gender selection is required";
    if (!formData.requiresAccommodation) newErrors.requiresAccommodation = "Accommodation preference is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEdit = (teacher) => {
    setEditingId(teacher.id);
    setFormData({
      teacherName: teacher.name,
      gender: teacher.gender,
      requiresAccommodation: teacher.requiresAccommodation,
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({
      teacherName: "",
      gender: "",
      requiresAccommodation: "",
    });
    setErrors({});
  };

  const TeacherForm = ({ isEditing = false }) => (
    <form onSubmit={handleSubmit} className="space-y-4 border rounded-lg p-4 shadow-sm">
      {errors.submit && (
        <div className="p-3 bg-red-100 text-red-700 rounded mb-4">
          {errors.submit}
        </div>
      )}

      <div>
        <label className="block mb-1 font-semibold">
          Name: <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.teacherName}
          onChange={(e) =>
            setFormData({ ...formData, teacherName: e.target.value })
          }
          className={`w-full p-2 border ${
            errors.teacherName ? "border-red-500" : "border-gray-300"
          } rounded`}
        />
        {errors.teacherName && (
          <p className="text-sm text-red-500">{errors.teacherName}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-semibold">
          Gender: <span className="text-red-500">*</span>
        </label>
        <select
          value={formData.gender}
          onChange={(e) =>
            setFormData({ ...formData, gender: e.target.value })
          }
          className={`w-full p-2 border ${
            errors.gender ? "border-red-500" : "border-gray-300"
          } rounded`}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        {errors.gender && (
          <p className="text-sm text-red-500">{errors.gender}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-semibold">
          Requires Accommodation: <span className="text-red-500">*</span>
        </label>
        <select
          value={formData.requiresAccommodation}
          onChange={(e) =>
            setFormData({
              ...formData,
              requiresAccommodation: e.target.value,
            })
          }
          className={`w-full p-2 border ${
            errors.requiresAccommodation
              ? "border-red-500"
              : "border-gray-300"
          } rounded`}
        >
          <option value="">Select Yes/No</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        {errors.requiresAccommodation && (
          <p className="text-sm text-red-500">
            {errors.requiresAccommodation}
          </p>
        )}
      </div>

      <div className="flex space-x-4">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {isEditing ? 'Save Changes' : 'Add Teacher'}
        </button>
        {isEditing && (
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Next
        </button>
      </div>
    </form>
  );

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

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Accompanying Teachers</h2>
        <div className="space-y-4">
          {teachers.length > 0 ? (
            teachers.map((teacher) => (
              <div key={teacher.id} className="border rounded-lg p-4 shadow-sm">
                {editingId === teacher.id ? (
                  <TeacherForm isEditing={true} />
                ) : (
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">{teacher.name}</h3>
                      <p className="text-gray-600">Gender: {teacher.gender}</p>
                      <p className="text-gray-600">
                        Requires Accommodation: {teacher.requiresAccommodation}
                      </p>
                      {teacher.updatedAt && (
                        <p className="text-sm text-gray-500">
                          Last modified: {new Date(teacher.updatedAt).toLocaleString()}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => handleEdit(teacher)}
                      className="px-3 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                    >
                      Edit
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <TeacherForm isEditing={false} />
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherDetailsForm;