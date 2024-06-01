import express from "express";

import {
    addASolution,
    getAllSolutionsForAParticularUserForAProblem,
    runAProblem,
    submitAProblem,
} from "../controllers/solutionController.js";

import passport from "passport";

const router = express.Router();

router.post("/add", passport.authenticate("basic"), addASolution);

router.get(
    "/get/:problemId/:userId",
    getAllSolutionsForAParticularUserForAProblem
);

router.post("/run/:problemId", passport.authenticate("jwt"), runAProblem);

//problem submit route
router.post(
    "/submit/:problemId",
    passport.authenticate("jwt"),
    submitAProblem
  );

export default router;