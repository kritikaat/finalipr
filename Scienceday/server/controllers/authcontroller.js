import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const register = async (req, res) => {
  try {
    const {
      schoolName,
      email,
      address,
      cityVillage,
      pincode,
      affiliationNumber,
      password,
    } = req.body;

    if (
      !schoolName ||
      !email ||
      !address ||
      !cityVillage ||
      !pincode ||
      !affiliationNumber ||
      !password
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingSchool = await prisma.schoolRegistration.findUnique({
      where: { email },
    });

    if (existingSchool) {
      return res
        .status(400)
        .json({ error: "School already registered with this email" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await prisma.$transaction(async (prisma) => {
      // Create SchoolRegistration first
      const registration = await prisma.schoolRegistration.create({
        data: {
          schoolName,
          email,
          address,
          cityVillage,
          pincode,
          affiliationNumber,
          password: hashedPassword,
        },
      });

      // Create School record with minimal required fields
      const school = await prisma.school.create({
        data: {
          name: schoolName,
          address,
          city: cityVillage,
          pincode,
          affiliationNumber,
          coordinatorTeacherName: "", // Providing empty string as placeholder
          coordinatorTeacherMobile: "", // Providing empty string as placeholder
          registrationId: registration.id,
        },
      });

      return { registration, school };
    });

    const token = jwt.sign(
      {
        registrationId: result.registration.id,
        schoolId: result.school.id,
        email: result.registration.email
      },
      process.env.JWT_SECRET || "your-default-secret-key",
      { expiresIn: "24h" }
    );

    res.status(201).json({
      message: "School registered successfully",
      token,
      school: {
        id: result.school.id,
        schoolName: result.registration.schoolName,
        email: result.registration.email,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      error: "Error registering school",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const registration = await prisma.schoolRegistration.findUnique({
      where: { email },
      include: {
        school: true,
      },
    });

    if (!registration) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const validPassword = await bcrypt.compare(password, registration.password);

    if (!validPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        registrationId: registration.id,
        schoolId: registration.school?.id,
        email: registration.email
      },
      process.env.JWT_SECRET || "your-default-secret-key",
      { expiresIn: "365d" }
    );

    res.json({
      message: "Login successful",
      token,
      school: {
        id: registration.school?.id,
        schoolName: registration.schoolName,
        email: registration.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Error during login" });
  }
};