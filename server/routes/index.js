import express from "express";

import authRoutes from "./authRoutes.js";
import problemRoutes from "./problemRoutes.js";
import solutionRoutes from "./solutionRoutes.js";
import testcaseRoutes from "./testcaseRoutes.js";
import userRoutes from "./userRoutes.js";

import { useInRouterContext } from "react-router-dom";

const router = express.Router();



router.use("/auth", authRoutes);

router.use("/problem" , problemRoutes);

router.use("/solutions" , solutionRoutes);

router.use("/testcases" , testcaseRoutes);

router.use("user" , userRoutes);



export default router;