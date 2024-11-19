import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Define the steps with fields
const steps = [
    {
        title: "Hall for Exhibition",
        fields: [
            { label: "Dimension of the hall (LxB in meters)", required: true, type: "text", helperText: "Dimension of the hall (LxB in meters) As large as possible (Min 15mx15m) Size available : 15m X 10m"},
            { label: "Is it an enclosed hall?", required: true, type: "text", helperText: "Enclosed hall required for safety"},
            { label: "Can the hall be darkened with curtains?", required: true, type: "text", helperText:"Can the hall be darkened with curtains? Hall should be dark to be able to see plasma properly. Either dark curtains or black paper covering over windows should be done." },
            { label: "Does the hall have A/C or fans?", required: true, type: "text", helperText:"Cooling is required to keep working models cool" },
            { label: "Is it on the ground floor?", required: true, type: "text", helperText:"Preferably on ground floor so that exhibits can be unloaded and taken to hall from truck. If exhibition hall is on the upper floor, then additional labour will be required for quick transfer of exhibits to the hall." },
            { label: "Is there a storage space for empty exhibit boxes?", required: true, type: "text", helperText:"Preferably on ground floor so that exhibits can be unloaded and taken to hall from truck. If exhibition hall is on the upper floor, then additional labour will be required for quick transfer of exhibits to the hall." },
            { label: "Can the hall be darkened with curtains?", required: true, type: "text", helperText:"Preferably on ground floor so that exhibits can be unloaded and taken to hall from truck. If exhibition hall is on the upper floor, then additional labour will be required for quick transfer of exhibits to the hall." },
            { label: "No. of 230V (5/15A) power outlets in the hall", required: true, type: "text", helperText:"We will need minimum 30 no’s of 230V/5A, grounded power outlets." },
            { label: "Tables for placing the exhibits", required: true, type: "text", helperText:"Sturdy, flat-top tables with wooden top and dark cloth cover (typical size 1.0x 0.5m or bigger) : 35 numbers and 20 chairs"},
            { label: "Space for VR", required: true, type: "text", helperText:"Min 3m x 3m for one VR exhibit If more space is made available, up to 4 VR exhibits can be operater."},
            { label: "WiFi Acess", required: true, type: "text", helperText:"WiFi access to all IPR team members for running VR exhibits and for performing office duties during the event."}
        ]
    },
    {
        title:"Hall for lectures/quiz/Tokotoy competition",
        fields: [
            { label: "Area of the hall", required: true, type: "text", helperText:"Should be able to comfortably seat" },
            { label: "Seating capcity", required: true, type: "text", helperText:"Should be able to comfortably seat minimum 50 people, with tables for conducting training programme, quiz and Tokotoy competition." },
            { label: "Does the hall have A/V facilities", required: true, type: "text", helperText:"Requires digital projector (HDMI input) and audio system" },
            { label: "Distance of lecture hall from exhibition hall", required: true, type: "text", helperText:"As close to exhibition hall as possible" }
        ]
    },
    {
        title:"Logistics and Accommodation Requirements for the IPR Team",
        fields: [
            { label: "Accommodation for IPR team (8 rooms, A/C, single occupancy)", required: true, type: "text", helperText:"With the new government order stipulating that officers on duty should use government guest houses, host will have to either provide accommodation at their cost or ensure that Government guest house is made available for which IPR will pay. Please note that final confirmation of event will be done by IPR only after receiving confirmation of accommodation." },
            { label: "Local transportation for IPR team (Min. 8 people)", required: true, type: "text", helperText:"Host will have to provide airport/railway station pickup/drop, daily transportation from accommodation to venue and back." },
            { label: "Secure parking space for IPR truck that will transport the exhibits", required: true, type: "text", helperText:"Preferably within the campus and also providing basic amenities to the truck driver" },
            { label: "Manpower for loading/unloading the exhibits from the truck and moving it to the exhibition hall", required: true, type: "text", helperText:"At least FOUR persons will be needed to help the driver to unload/load the exhibits from the truck and move it to the exhibition hall. If exhibition hall is on the upper floor, then additional labour will be required for quick transfer of exhibits to the hall." },
        ]
    },
    {
        title:"Details for the Event Poster",
        fields: [
            { label: "Name of the contact person", required: true, type: "text", helperText:"These three details will appear on the event poster that IPR will make and send it to the host for circulation." },
            { label: "Mobile Number", required: true, type: "text", helperText:"These three details will appear on the event poster that IPR will make and send it to the host for circulation." },
            { label: "E-mail", required: true, type: "text", helperText:"These three details will appear on the event poster that IPR will make and send it to the host for circulation." },
            { label: "Location of the venue", required: true, type: "text", helperText:"Full address of the venue of the exhibition (including name of the hall, building etc)" },
        ]
    },
    {
        title:"Teacher Training Program",
        fields: [
            { label: "Invitation to teachers", required: true, type: "text", helperText:"Minimum number – 25. Maximum number – 50. Only ONE resource material kit will be provided to a school/college with multiple participating teachers. Confirmation regarding teacher training should be given to IPR at least 2 weeks before the event." },
            { label: "Registration", required: true, type: "text", helperText:"Minimum number – 25. Maximum number – 50. Only ONE resource material kit will be provided to a school/college with multiple participating teachers. Confirmation regarding teacher training should be given to IPR at least 2 weeks before the event." },
            { label: "Providing them with writing pad/pen etc", required: true, type: "text", helperText:"Minimum number – 25. Maximum number – 50. Only ONE resource material kit will be provided to a school/college with multiple participating teachers. Confirmation regarding teacher training should be given to IPR at least 2 weeks before the event." },
            { label: "Providing them with tea/lunch", required: true, type: "text", helperText:"Minimum number – 25. Maximum number – 50. Only ONE resource material kit will be provided to a school/college with multiple participating teachers. Confirmation regarding teacher training should be given to IPR at least 2 weeks before the event." },
        ]
    },
    {
        title:"Quiz Programme",
        fields: [
            { label: "Quiz is meant for school students (8-12 classes)", required: true, type: "text", helperText:"Minimum teams 10. No. of participants / team – 2. IPR will provide prizes and certificates. Host has to confirm with IPR whether they want to host the quiz competition for school children." },
            { label: "Selection and registration of teams", required: true, type: "text", helperText:"Minimum teams 10. No. of participants / team – 2. IPR will provide prizes and certificates. Host has to confirm with IPR whether they want to host the quiz competition for school children." },
            { label: "Arrangements for organizing the quiz)", required: true, type: "text", helperText:"Minimum teams 10. No. of participants / team – 2. IPR will provide prizes and certificates. Host has to confirm with IPR whether they want to host the quiz competition for school children." },
            { label: "Providing refreshment to participants", required: true, type: "text", helperText:"Minimum teams 10. No. of participants / team – 2. IPR will provide prizes and certificates. Host has to confirm with IPR whether they want to host the quiz competition for school children." },
        ]
    }
];


const IPRExForm = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({});
    const [filledFields, setFilledFields] = useState(0);

    const currentFields = steps[currentStep].fields;
    const totalFields = currentFields.length;

    // In handleInputChange, calculate total fields for the current step
        const handleInputChange = (index, value) => {
            const key = `step${currentStep}_field${index}`;
            setFormData({ ...formData, [key]: value });

            // Get the number of fields for the current step only
            const stepFieldKeys = currentFields.map((_, i) => `step${currentStep}_field${i}`);
            const totalFields = stepFieldKeys.length;

            // Calculate how many fields in the current step are filled
            const filledFieldsInStep = stepFieldKeys.filter(key => formData[key] && formData[key].trim() !== "").length;

            // If the current field being changed is valid and not empty, add it to the filled count
            const newFilledFields = filledFieldsInStep + (value.trim() !== "" && !formData[key] ? 1 : 0);

            setFilledFields(newFilledFields);
        };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Validate that all required fields for the current step are filled
        const isValid = currentFields.every((field, index) => {
            const key = `step${currentStep}_field${index}`;
            return field.required ? (formData[key] && formData[key].trim() !== "") : true;
        });

        if (!isValid) {
            alert("Please fill all required fields");
            return;
        }

        // If valid, proceed to the next step or submit the form
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
            setFilledFields(0); // Reset the filled fields for the next step
        } else {
            console.log("Form submitted:", formData);
            navigate('/submit');
        }
    };

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
            setFilledFields(0); // Reset filled fields for previous step
        }
    };

    return (
        <div className="bg-gray-100 p-12 flex justify-center items-center h-full w-auto">
            <div className="bg-white p-8 border border-blue-500 rounded-lg shadow-lg w-full">
                <h1 className="text-3xl font-bold text-gray-800 text-center">Exhibition Form for IPR Scientific Visit</h1>

                {/* Progress Bar */}
                <div className="mt-8 mb-4">
                    <div className="relative flex justify-between items-center">
                        {steps.map((_, index) => (
                            <React.Fragment key={index}>
                                <div className="relative z-10">
                                    <div className={`w-12 h-12 flex items-center justify-center rounded-full border-2 ${index <= currentStep ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300 bg-white text-gray-600'} font-bold`}>
                                        {index + 1}
                                    </div>
                                </div>
                                {index < steps.length - 1 && (
                                <div className="relative rounded-full w-full h-0.5 mx-2 bg-gray-300">
                                <div
                                    className="h-full bg-blue-600"
                                    style={{
                                        width:
                                            index < currentStep
                                                ? '100%' // For past steps, the progress bar is fully filled
                                                : index === currentStep
                                                ? `${Math.min((filledFields / totalFields) * 100, 100)}%` // For the current step, calculate the percentage filled, but ensure it doesn't exceed 100%
                                                : '0%', // For future steps, the progress bar is empty
                                        borderRadius: '999px',
                                        transition: 'width 0.3s ease'
                                    }}
                                ></div>
                            </div>

                            )}
                            </React.Fragment>
                        ))}
                    </div>

                    {/* Active Step Title */}
                    <div className="bg-blue-600 text-white p-4 mt-8 rounded-md font-semibold text-lg">
                        {steps[currentStep].title}
                    </div>
                </div>

                {/* Form Fields */}
                <form onSubmit={handleSubmit}>
                    {steps[currentStep].fields.map((field, index) => (
                        <div key={index} className="mb-6">
                            <label className="block mb-1 font-semibold">
                                {field.label}
                                {field.required && <span className="text-red-600 font-bold"> *</span>}
                            </label>
                            <input
                                type={field.type}
                                value={formData[`step${currentStep}_field${index}`] || ''}
                                onChange={(e) => handleInputChange(index, e.target.value)}
                                required={field.required}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                            <p className="text-sm text-gray-500">{field.helperText}</p>
                        </div>
                    ))}

                    <div className="flex justify-between mt-6">
                        <button
                            type="button"
                            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                            onClick={handlePrevious}
                            disabled={currentStep === 0}
                        >
                            Back
                        </button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                            {currentStep < steps.length - 1 ? 'Next' : 'Submit'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default IPRExForm;