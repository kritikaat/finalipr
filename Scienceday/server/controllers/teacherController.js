import prisma from "../DB/db.config.js";

// Create accompanying teacher
const createAccompanyingTeacher = async (req, res) => {
  const { name, gender, requiresAccommodation, schoolId } = req.body;

  try {
    const school = await prisma.school.findUnique({
      where: {
        id: parseInt(schoolId),
      },
    });

    if (!school) {
      return res.status(404).json({ error: "School not found" });
    }

    const teacher = await prisma.accompanyingTeacher.create({
      data: {
        name,
        gender,
        requiresAccommodation,
        schoolId: parseInt(schoolId),
      },
    });

    res.status(201).json(teacher);
  } catch (error) {
    console.error("Error creating teacher:", error);
    res.status(500).json({ error: "Failed to create accompanying teacher" });
  }
};

// Get accompanying teacher by ID
const getAccompanyingTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const teacherId = parseInt(id);

    if (isNaN(teacherId)) {
      return res.status(400).json({ error: "Invalid teacher ID" });
    }

    const teacherData = await prisma.accompanyingTeacher.findUnique({
      where: {
        id: teacherId,
      },
      include: {
        school: true, // Include related school data if needed
      },
    });

    if (!teacherData) {
      return res.status(404).json({ error: "Accompanying teacher not found" });
    }

    res.json(teacherData);
  } catch (error) {
    console.error("Error fetching teacher:", error);
    res.status(500).json({ error: "Failed to fetch accompanying teacher data" });
  }
};

// Get all accompanying teachers for a school
const getSchoolAccompanyingTeachers = async (req, res) => {
  try {
    const { schoolId } = req.params;
    const parsedSchoolId = parseInt(schoolId);

    if (isNaN(parsedSchoolId)) {
      return res.status(400).json({ error: "Invalid school ID" });
    }

    const teachers = await prisma.accompanyingTeacher.findMany({
      where: {
        schoolId: parsedSchoolId,
      },
    });

    res.json(teachers);
  } catch (error) {
    console.error("Error fetching teachers:", error);
    res.status(500).json({ error: "Failed to fetch accompanying teachers" });
  }
};

// Update accompanying teacher
const updateAccompanyingTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const teacherId = parseInt(id);

    if (isNaN(teacherId)) {
      return res.status(400).json({ error: "Invalid teacher ID" });
    }

    const updateData = req.body;

    // Validate update data
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ error: "No update data provided" });
    }

    // Check if teacher exists
    const existingTeacher = await prisma.accompanyingTeacher.findUnique({
      where: { id: teacherId }
    });

    if (!existingTeacher) {
      return res.status(404).json({ error: "Accompanying teacher not found" });
    }

    // If schoolId is provided in update data, validate it
    if (updateData.schoolId) {
      const school = await prisma.school.findUnique({
        where: { id: parseInt(updateData.schoolId) }
      });

      if (!school) {
        return res.status(404).json({ error: "School not found" });
      }
      updateData.schoolId = parseInt(updateData.schoolId);
    }

    const updatedTeacher = await prisma.accompanyingTeacher.update({
      where: {
        id: teacherId
      },
      data: updateData,
    });

    res.json({
      message: "Accompanying teacher updated successfully",
      data: updatedTeacher
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ error: "Failed to update accompanying teacher data" });
  }
};

export {
  createAccompanyingTeacher,
  getAccompanyingTeacher,
  getSchoolAccompanyingTeachers,
  updateAccompanyingTeacher
};