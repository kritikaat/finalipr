import prisma from "../DB/db.config.js";

const createSchool = async (req, res) => {
  const {
    coordinatorTeacherName,
    coordinatorTeacherMobile,
    name,
    address,
    city,
    pincode,
    affiliationNumber,
    registrationId,
  } = req.body;

  try {
    const school = await prisma.school.create({
      data: {
        coordinatorTeacherName,
        coordinatorTeacherMobile,
        name,
        address,
        city,
        pincode,
        affiliationNumber,
        registrationId,
      },
    });
    res.status(201).json(school);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create school" });
  }
};

const getSchoolData = async (req, res) => {
  try {
    const { id } = req.params; // Get schoolId from URL parameter
    
    const schoolId = parseInt(id);
    
    if (isNaN(schoolId)) {
      return res.status(400).json({ error: "Invalid school ID" });
    }
    
    const schoolData = await prisma.school.findUnique({
      where: {
        id: schoolId,  // Changed from id: id to id: schoolId
      },
      include: {
        Quiz: true,
        EloquenceEnglish: true,
        EloquenceHindi: true,
        EloquenceGujarati: true,
        EssayEnglish: true,
        EssayHindi: true,
        EssayGujarati: true,
        Poster: true,
        Skit: true,
        TeacherModel: true,
        StudentModel1: true,
        StudentModel2: true,
        accompanyingTeachers: true,
        competitions: true,
        registration: true,
      },
    });
    
    if (!schoolData) {
      return res.status(404).json({ error: "School not found" });
    }
    
    res.json(schoolData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch school data" });
  }
};
// Update school data
const updateSchoolData = async (req, res) => {
  try {
    const { id } = req.params;
    const schoolId = parseInt(id);
    
    if (isNaN(schoolId)) {
      return res.status(400).json({ error: "Invalid school ID" });
    }

    const updateData = req.body;

    // Validate updateData
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ error: "No update data provided" });
    }

    // Check if school exists
    const existingSchool = await prisma.school.findUnique({
      where: { id: schoolId }
    });

    if (!existingSchool) {
      return res.status(404).json({ error: "School not found" });
    }

    const updatedSchool = await prisma.school.update({
      where: {
        id: schoolId
      },
      data: updateData,
    });

    res.json({
      message: "School updated successfully",
      data: updatedSchool
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ error: "Failed to update school data" });
  }
};

export { createSchool, getSchoolData, updateSchoolData };

