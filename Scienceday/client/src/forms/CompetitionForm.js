import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StudentModelForm from "./StudentModelForm";
import QuizForm from "./QuizForm";
import EloquenceForm from "./EloquenceForm";
import EssayForm from "./EssayForm";
import PosterForm from "./PosterForm";
import SkitForm from "./SkitForm";
import TeacherModelForm from "./TeacherModelForm";
import Login from "../components/login";

const CompetitionForm = ({
  onComplete,
  competitionFilled,
  setCompetitionFilled,
}) => {
  const [selectedCompetition, setSelectedCompetition] = useState("");
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleCompetitionChange = (e) => {
    setSelectedCompetition(e.target.value);
  };

  const resetForm = () => {
    setSelectedCompetition("");
    setFormData({});
    setCompetitionFilled(new Set());
  };

  const handleSubmitAll = async () => {
    try {
      await onComplete(formData);
      toast.success("All forms submitted successfully!");
      resetForm();
      setTimeout(() => {
        navigate('/');
      }, 1000); // Navigate after 1 second to allow toast to be visible
    } catch (error) {
      toast.error(error.message || "Error submitting forms");
    }
  };

  const handleSaveAndContinue = async (competitionData) => {
    if (competitionFilled.has(selectedCompetition)) {
      toast.error("You have already submitted this competition");
      return;
    }

    const schoolId = localStorage.getItem("schoolId");
    const token = localStorage.getItem("token");

    try {
      let endpoint = "";
      switch (selectedCompetition) {
        case "Student's Model-1":
          endpoint = "student-model-1";
          break;
        case "Student's Model-2":
          endpoint = "student-model-2";
          break;
        case "Quiz":
          endpoint = "quiz";
          break;
        case "Eloquence - English":
          endpoint = "eloquence/english";
          break;
        case "Eloquence - Hindi":
          endpoint = "eloquence/hindi";
          break;
        case "Eloquence - Gujarati":
          endpoint = "eloquence/gujarati";
          break;
        case "Essay - English":
          endpoint = "essay/english";
          break;
        case "Essay - Hindi":
          endpoint = "essay/hindi";
          break;
        case "Essay - Gujarati":
          endpoint = "essay/gujarati";
          break;
        case "Poster":
          endpoint = "poster";
          break;
        case "Skit":
          endpoint = "skit";
          break;
        case "Teacher Model":
          endpoint = "teacher-model";
          break;
        default:
          throw new Error("Invalid competition selected");
      }

      const response = await fetch(`http://localhost:4000/api/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...competitionData,
          schoolId: parseInt(schoolId),
        }),
      });

      if (response.ok) {
        await response.json();
        setCompetitionFilled(
          new Set([...competitionFilled, selectedCompetition])
        );
        resetForm();
        toast.success("Form submitted successfully!");
        navigate('/competition');
      } else {
        const error = await response.json();
        throw new Error(error.message || "Submission failed");
      }
    } catch (error) {
      console.error("Error submitting competition:", error);
      toast.error(error.message || "Error submitting form");
    }
  };

  const renderCompetitionForm = () => {
    switch (selectedCompetition) {
      case "Student's Model-1":
      case "Student's Model-2":
        return (
          <StudentModelForm
            onSubmit={handleSaveAndContinue}
            modelNumber={selectedCompetition.slice(-1)}
          />
        );
      case "Quiz":
        return <QuizForm onSubmit={handleSaveAndContinue} />;
      case "Eloquence - English":
      case "Eloquence - Hindi":
      case "Eloquence - Gujarati":
        return (
          <EloquenceForm
            onSubmit={handleSaveAndContinue}
            language={selectedCompetition.split(" - ")[1]}
          />
        );
      case "Essay - English":
      case "Essay - Hindi":
      case "Essay - Gujarati":
        return (
          <EssayForm
            onSubmit={handleSaveAndContinue}
            language={selectedCompetition.split(" - ")[1]}
          />
        );
      case "Poster":
        return <PosterForm onSubmit={handleSaveAndContinue} />;
      case "Skit":
        return <SkitForm onSubmit={handleSaveAndContinue} />;
      case "Teacher Model":
        return <TeacherModelForm onSubmit={handleSaveAndContinue} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <label className="block mb-1 font-semibold">
          Select Competition <span className="text-red-500">*</span>
        </label>
        <select
          value={selectedCompetition}
          onChange={handleCompetitionChange}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Select Competition</option>
          <option value="Student's Model-1">Student's Model-1</option>
          <option value="Student's Model-2">Student's Model-2</option>
          <option value="Quiz">Quiz</option>
          <option value="Eloquence - English">Eloquence - English</option>
          <option value="Eloquence - Hindi">Eloquence - Hindi</option>
          <option value="Eloquence - Gujarati">Eloquence - Gujarati</option>
          <option value="Essay - English">Essay - English</option>
          <option value="Essay - Hindi">Essay - Hindi</option>
          <option value="Essay - Gujarati">Essay - Gujarati</option>
          <option value="Poster">Poster</option>
          <option value="Skit">Skit</option>
          <option value="Teacher Model">Teacher Model</option>
        </select>
      </div>

      {renderCompetitionForm()}

      <div className="flex justify-between mt-4">
        <button
          onClick={handleSubmitAll}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Submit All
        </button>
      </div>
    </div>
  );
};

export default CompetitionForm;