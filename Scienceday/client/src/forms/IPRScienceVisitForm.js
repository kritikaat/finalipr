import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header.js";
import ProgressBar from "../components/progressbar.js";
import SchoolDetailsForm from "./SchoolDetailsForm";
import TeacherDetailsForm from "./TeacherDetailsForm";
import CompetitionForm from "./CompetitionForm.js";

const IPRScienceVisitform = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [filledFields, setFilledFields] = useState(0);
  const [competitionFilled, setCompetitionFilled] = useState(new Set());

  const handleStepComplete = (stepData) => {
    // Save step data and move to next step
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return <SchoolDetailsForm onComplete={handleStepComplete} />;
      case 1:
        return <TeacherDetailsForm onComplete={handleStepComplete} />;
      case 2:
        return (
          <CompetitionForm
            onComplete={handleStepComplete}
            competitionFilled={competitionFilled}
            setCompetitionFilled={setCompetitionFilled}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-100 p-12 flex justify-center items-center min-h-screen">
      <div className="bg-white p-8 border border-blue-500 rounded-lg flex flex-col justify-between min-h-screen shadow-lg w-full z-0">
        <Header />
        <ProgressBar
          currentStep={currentStep}
          totalSteps={3}
          filledFields={filledFields}
        />
        {renderCurrentStep()}
        <div className="flex justify-between ">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default IPRScienceVisitform;
