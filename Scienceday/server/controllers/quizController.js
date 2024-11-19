import prisma from "../DB/db.config.js";

// Create a new quiz
const createQuiz = async (req, res) => {
  const {
    participant1Name,
    participant1Gender,
    participant1Class,
    participant1Accommodation,
    participant2Name,
    participant2Gender,
    participant2Class,
    participant2Accommodation,
    declaration,
    schoolId,
  } = req.body;

  try {
    const school = await prisma.school.findUnique({
      where: {
        id: parseInt(schoolId),
      },
    });

    if (!school) {
      return res.status(404).json({ error: "School not found" });
    }

    const quiz = await prisma.quiz.create({
      data: {
        participant1Name,
        participant1Gender,
        participant1Class,
        participant1Accommodation,
        participant2Name,
        participant2Gender,
        participant2Class,
        participant2Accommodation,
        declaration: declaration.toString(),
        schoolId: parseInt(schoolId),
      },
    });

    res.status(201).json(quiz);
  } catch (error) {
    console.error("Error creating quiz:", error);
    res.status(500).json({ error: "Failed to create quiz" });
  }
};

// Get quiz by ID
const getQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const quizId = parseInt(id);

    if (isNaN(quizId)) {
      return res.status(400).json({ error: "Invalid quiz ID" });
    }

    const quizData = await prisma.quiz.findUnique({
      where: {
        id: quizId,
      },
      include: {
        school: true, // Include related school data
      },
    });

    if (!quizData) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    res.json(quizData);
  } catch (error) {
    console.error("Error fetching quiz:", error);
    res.status(500).json({ error: "Failed to fetch quiz data" });
  }
};

// Get all quizzes for a school
const getSchoolQuizzes = async (req, res) => {
  try {
    const { schoolId } = req.params;
    const parsedSchoolId = parseInt(schoolId);

    if (isNaN(parsedSchoolId)) {
      return res.status(400).json({ error: "Invalid school ID" });
    }

    const quizzes = await prisma.quiz.findMany({
      where: {
        schoolId: parsedSchoolId,
      },
    });

    res.json(quizzes);
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    res.status(500).json({ error: "Failed to fetch quizzes" });
  }
};

// Update quiz
const updateQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const quizId = parseInt(id);

    if (isNaN(quizId)) {
      return res.status(400).json({ error: "Invalid quiz ID" });
    }

    const updateData = req.body;

    // Validate update data
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ error: "No update data provided" });
    }

    // Check if quiz exists
    const existingQuiz = await prisma.quiz.findUnique({
      where: { id: quizId }
    });

    if (!existingQuiz) {
      return res.status(404).json({ error: "Quiz not found" });
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

    // Convert declaration to string if provided
    if (updateData.declaration) {
      updateData.declaration = updateData.declaration.toString();
    }

    const updatedQuiz = await prisma.quiz.update({
      where: {
        id: quizId
      },
      data: updateData,
    });

    res.json({
      message: "Quiz updated successfully",
      data: updatedQuiz
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ error: "Failed to update quiz data" });
  }
};

// Delete quiz
const deleteQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const quizId = parseInt(id);

    if (isNaN(quizId)) {
      return res.status(400).json({ error: "Invalid quiz ID" });
    }

    // Check if quiz exists
    const existingQuiz = await prisma.quiz.findUnique({
      where: { id: quizId }
    });

    if (!existingQuiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    await prisma.quiz.delete({
      where: {
        id: quizId
      }
    });

    res.json({
      message: "Quiz deleted successfully"
    });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ error: "Failed to delete quiz" });
  }
};

export {
  createQuiz,
  getQuiz,
  getSchoolQuizzes,
  updateQuiz,
  deleteQuiz
};