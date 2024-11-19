import React from "react";

const ProgressBar = ({ currentStep, totalSteps, filledFields }) => {
  return (
    <div className="relative flex justify-between items-center mt-4 mb-6">
      {[...Array(totalSteps)].map((_, index) => (
        <React.Fragment key={index}>
          <div className="relative z-10">
            <div
              className={`w-12 h-12 flex items-center justify-center rounded-full border-2 ${
                index <= currentStep
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-gray-300 bg-white text-gray-600"
              } font-bold`}
            >
              {index + 1}
            </div>
          </div>
          {index < totalSteps - 1 && (
            <div className="relative rounded-full w-full h-0.5 mx-2 bg-gray-300">
              <div
                className="h-full bg-blue-600"
                style={{
                  width: `${index < currentStep ? 100 : filledFields}%`,
                  borderRadius: "999px",
                  transition: "width 0.3s ease",
                }}
              />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ProgressBar;
