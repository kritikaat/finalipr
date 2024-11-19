import prisma from "../DB/db.config.js";

const createPoster = async (req, res) => {
  const {
    participant1Name,
    participant1Gender,
    participant1Class,
    participant1Accommodation,
    declaration,
    participant2Name,
    participant2Gender,
    participant2Class,
    participant2Accommodation,
    schoolId,
  } = req.body;
  try {
    const poster = await prisma.poster.create({
      data: {
        participant1Name,
        participant1Gender,
        participant1Class,
        participant1Accommodation,
        participant1Declaration: declaration.toString(),
        participant2Name,
        participant2Gender,
        participant2Class,
        participant2Accommodation,
        participant2Declaration: declaration.toString(),
        schoolId,
      },
    });
    res.json(poster);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export default createPoster;
