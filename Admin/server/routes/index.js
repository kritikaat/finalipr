import { Router } from "express";
import ratingsRoutes from "./ratingRoutes.js";
import feedbackRoutes from "./feedbackroute.js";
import visitorRoutes from "./visitorroute.js";
import exhibitionRoutes from "./exhibitionroute.js";
import adminRoutes from "./admin.js";
import emailRoutes from "./emailroute.js";
import exhibitionemailRoutes from "./exhibitonemailroute.js";

const router = Router();

router.use("/feedback", feedbackRoutes);
router.use("/ratings", ratingsRoutes);
router.use("/visitor", visitorRoutes);
router.use("/exhibition", exhibitionRoutes);
router.use("/admin", adminRoutes);
router.use("/email", emailRoutes);  // Changed from "/send-approval-email" to "/email"
router.use("/exhibitionemail", exhibitionemailRoutes);

export default router;