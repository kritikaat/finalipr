import { z } from 'zod';
import prisma from "../DB/db.config.js";


// Define Zod schema for validation
const schoolAllInOneSchema = z.object({
  name: z.string().min(1, "School name is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  pincode: z.string().min(1, "Pincode is required"),
  affiliationNumber: z.string().min(1, "Affiliation number is required"),
  coordinatorTeacherName: z.string().min(1, "Coordinator teacher name is required"),
  coordinatorTeacherMobile: z.string().regex(/^\d{10}$/, "Coordinator teacher mobile must be 10 digits"),
  accompanyingTeacherName: z.string().min(1, "Accompanying teacher name is required"),
  accompanyingTeacherGender: z.boolean().transform((val) => (val ? "Male" : "Female")),
  accompanyingTeacherAccommodation: z.boolean(),
  competitionTitle: z.string().min(1, "Competition title is required"),


  teacherName: z.string().min(1, "Teacher name is required"),
  teacherGender: z.boolean().transform((val) => (val ? "Male" : "Female")),
  accommodationRequired: z.boolean().transform((val) => (val ? "Yes" : "No")),
  additionalRequirements: z.string().optional(),
  declaration: z.string().min(1, "Declaration is required"),
  writeup: z.string().min(1, "Writeup is required"),
  

  // Participant 1 details
  participant1Name: z.string().min(1, "Participant 1 name is required"),
  participant1Gender: z.boolean().transform((val) => (val ? "Male" : "Female")),
  participant1Class: z.string().min(1, "Participant 1 class is required"),
  participant1Accommodation: z.boolean().transform((val) => (val ? "Yes" : "No")),

  // Participant 2 details
  participant2Name: z.string().min(1, "Participant 2 name is required"),
  participant2Gender: z.boolean().transform((val) => (val ? "Male" : "Female")),
  participant2Class: z.string().min(1, "Participant 2 class is required"),
  participant2Accommodation: z.boolean().transform((val) => (val ? "Yes" : "No")),

  studentAdditionalRequirements: z.string().optional(),
  studentDeclaration: z.string().min(1, "Student declaration is required"),
  studentWriteup: z.string().min(1, "Student writeup is required"),

  // Participant 1 (2nd set) details
  participant1Name2: z.string().min(1, "Participant 1 name 2 is required"),
  participant1Gender2: z.boolean().transform((val) => (val ? "Male" : "Female")),
  participant1Class2: z.string().min(1, "Participant 1 class 2 is required"),
  participant1Accommodation2: z.boolean().transform((val) => (val ? "Yes" : "No")),

  // Participant 2 (2nd set) details
  participant2Name2: z.string().min(1, "Participant 2 name 2 is required"),
  participant2Gender2: z.boolean().transform((val) => (val ? "Male" : "Female")),
  participant2Class2: z.string().min(1, "Participant 2 class 2 is required"),
  participant2Accommodation2: z.boolean().transform((val) => (val ? "Yes" : "No")),

  studentAdditionalRequirements2: z.string().optional(),
  studentDeclaration2: z.string().min(1, "Student declaration 2 is required"),
  studentWriteup2: z.string().min(1, "Student writeup 2 is required"),

  // Eloquence details
  eloquenceEnglishName: z.string().min(1, "Eloquence English name is required"),
  eloquenceEnglishGender: z.boolean().transform((val) => (val ? "Male" : "Female")),
  eloquenceEnglishClass: z.string().min(1, "Eloquence English class is required"),
  eloquenceEnglishAccommodation: z.boolean().transform((val) => (val ? "Yes" : "No")),
  eloquenceEnglishDeclaration: z.string().min(1, "Eloquence English declaration is required"),

  eloquenceHindiName: z.string().min(1, "Eloquence Hindi name is required"),
  eloquenceHindiGender: z.boolean().transform((val) => (val ? "Male" : "Female")),
  eloquenceHindiClass: z.string().min(1, "Eloquence Hindi class is required"),
  eloquenceHindiAccommodation: z.boolean().transform((val) => (val ? "Yes" : "No")),
  eloquenceHindiDeclaration: z.string().min(1, "Eloquence Hindi declaration is required"),

  eloquenceGujaratiName: z.string().min(1, "Eloquence Gujarati name is required"),
  eloquenceGujaratiGender: z.boolean().transform((val) => (val ? "Male" : "Female")),
  eloquenceGujaratiClass: z.string().min(1, "Eloquence Gujarati class is required"),
  eloquenceGujaratiAccommodation: z.boolean().transform((val) => (val ? "Yes" : "No")),
  eloquenceGujaratiDeclaration: z.string().min(1, "Eloquence Gujarati declaration is required"),

  // Essay details
  essayEnglishName: z.string().min(1, "Essay English name is required"),
  essayEnglishGender: z.boolean().transform((val) => (val ? "Male" : "Female")),
  essayEnglishClass: z.string().min(1, "Essay English class is required"),
  essayEnglishAccommodation: z.boolean().transform((val) => (val ? "Yes" : "No")),
  essayEnglishFileUrl: z.string().url("Valid URL required for Essay English file"),
  essayEnglishDeclaration: z.string().min(1, "Essay English declaration is required"),

  essayHindiName: z.string().min(1, "Essay Hindi name is required"),
  essayHindiGender: z.boolean().transform((val) => (val ? "Male" : "Female")),
  essayHindiClass: z.string().min(1, "Essay Hindi class is required"),
  essayHindiAccommodation: z.boolean().transform((val) => (val ? "Yes" : "No")),
  essayHindiFileUrl: z.string().url("Valid URL required for Essay Hindi file"),
  essayHindiDeclaration: z.string().min(1, "Essay Hindi declaration is required"),

  essayGujaratiName: z.string().min(1, "Essay Gujarati name is required"),
  essayGujaratiGender: z.boolean().transform((val) => (val ? "Male" : "Female")),
  essayGujaratiClass: z.string().min(1, "Essay Gujarati class is required"),
  essayGujaratiAccommodation: z.boolean().transform((val) => (val ? "Yes" : "No")),
  essayGujaratiFileUrl: z.string().url("Valid URL required for Essay Gujarati file"),
  essayGujaratiDeclaration: z.string().min(1, "Essay Gujarati declaration is required"),

  // Poster details
  posterParticipant1Name: z.string().min(1, "Poster participant 1 name is required"),
  posterParticipant1Gender: z.boolean().transform((val) => (val ? "Male" : "Female")),
  posterParticipant1Class: z.string().min(1, "Poster participant 1 class is required"),
  posterParticipant1Accommodation: z.boolean().transform((val) => (val ? "Yes" : "No")),
  posterParticipant1Declaration: z.string().min(1, "Poster participant 1 declaration is required"),

  posterParticipant2Name: z.string().min(1, "Poster participant 2 name is required"),
  posterParticipant2Gender: z.boolean().transform((val) => (val ? "Male" : "Female")),
  posterParticipant2Class: z.string().min(1, "Poster participant 2 class is required"),
  posterParticipant2Accommodation: z.boolean().transform((val) => (val ? "Yes" : "No")),
  posterParticipant2Declaration: z.string().min(1, "Poster participant 2 declaration is required"),

  // Skit details
  skitParticipant1Name: z.string().min(1, "Skit participant 1 name is required"),
  skitParticipant1Gender: z.boolean().transform((val) => (val ? "Male" : "Female")),
  skitParticipant1Class: z.string().min(1, "Skit participant 1 class is required"),
  skitParticipant1Accommodation: z.boolean().transform((val) => (val ? "Yes" : "No")),

  skitParticipant2Name: z.string().min(1, "Skit participant 2 name is required"),
  skitParticipant2Gender: z.boolean().transform((val) => (val ? "Male" : "Female")),
  skitParticipant2Class: z.string().min(1, "Skit participant 2 class is required"),
  skitParticipant2Accommodation: z.boolean().transform((val) => (val ? "Yes" : "No")),

  skitAdditionalRequirements: z.string().optional(),
  skitDeclaration: z.string().min(1, "Skit declaration is required"),

  // Dance details
  danceParticipant1Name: z.string().min(1, "Dance participant 1 name is required"),
  danceParticipant1Gender: z.boolean().transform((val) => (val ? "Male" : "Female")),
  danceParticipant1Class: z.string().min(1, "Dance participant 1 class is required"),
  danceParticipant1Accommodation: z.boolean().transform((val) => (val ? "Yes" : "No")),

  danceParticipant2Name: z.string().min(1, "Dance participant 2 name is required"),
  danceParticipant2Gender: z.boolean().transform((val)=>(val ? "Male" : "Female")),
  danceParticipant2Class: z.string().min(1, "Dance participant 2 class is required"),
  danceParticipant2Accommodation: z.boolean().transform((val)=>(val ? "yes" : "no")),

  danceDeclaration: z.string().min(1, "Dance declaration is required"),

  // Sports details
  sportsTeamName: z.string().min(1, "Sports team name is required"),
  sportsGender: z.boolean().transform((val) => (val ? "Male" : "Female")),
  sportsAccommodation: z.boolean().transform((val) => (val ? "Yes" : "No")),
  sportsDeclaration: z.string().min(1, "Sports declaration is required"),

  // Additional details
  parentDetails: z.string().optional(),
  otherComments: z.string().optional(),
});

const createSchoolAllInOne = async (req, res) => {
  try {
    // Validate data using Zod schema
    const validatedData = schoolAllInOneSchema.parse(req.body);

    // Convert "Yes"/"No" to boolean for accommodation fields
    const convertedData = {
      ...validatedData,
    };

    // Proceed with data insertion into database (prisma or another ORM)
    const school = await prisma.schoolAllInOne.create({
      data: convertedData
    });
    
    res.status(201).json({ message: "Scienceday form submitted successfully", school });
  } catch (error) {
    if (error instanceof z.ZodError) {
        res.status(400).json({ errors: error.errors });
      } else {
        console.error("Error submitting visitor form:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
      }
  }
};
export default createSchoolAllInOne;