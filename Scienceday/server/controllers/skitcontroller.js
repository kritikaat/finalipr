import prisma from "../DB/db.config.js";

const createSkit = async (req, res) => {
  const {
    participants,
    additionalRequirements,
    videoLink,
    declaration,
    schoolId,
  } = req.body;

  try {
    // Check if school exists
    const school = await prisma.school.findUnique({
      where: {
        id: parseInt(schoolId),
      },
    });

    if (!school) {
      return res.status(404).json({ error: "School not found" });
    }

    const skit = await prisma.skit.create({
      data: {
        participant1Name: participants[0].name,
        participant1Gender: participants[0].gender,
        participant1Class: participants[0].class,
        participant1Accommodation: participants[0].requiresAccommodation,
        participant2Name: participants[1]?.name,
        participant2Gender: participants[1]?.gender,
        participant2Class: participants[1]?.class,
        participant2Accommodation: participants[1]?.requiresAccommodation,
        participant3Name: participants[2]?.name,
        participant3Gender: participants[2]?.gender,
        participant3Class: participants[2]?.class,
        participant3Accommodation: participants[2]?.requiresAccommodation,
        participant4Name: participants[3]?.name,
        participant4Gender: participants[3]?.gender,
        participant4Class: participants[3]?.class,
        participant4Accommodation: participants[3]?.requiresAccommodation,
        participant5Name: participants[4]?.name,
        participant5Gender: participants[4]?.gender,
        participant5Class: participants[4]?.class,
        participant5Accommodation: participants[4]?.requiresAccommodation,
        participant6Name: participants[5]?.name,
        participant6Gender: participants[5]?.gender,
        participant6Class: participants[5]?.class,
        participant6Accommodation: participants[5]?.requiresAccommodation,
        additionalRequirements,
        videoLink,
        declaration: declaration.toString(),
        schoolId: parseInt(schoolId),
      },
    });

    res.status(201).json(skit);
  } catch (error) {
    console.error("Error creating skit:", error);
    res.status(500).json({ error: "Failed to create skit entry" });
  }
};

export default createSkit;
