import express from "express";

import{
    addATestcase,
  deleteATestcase,
  getAllTestcasesForAProblem,
  updateATestcase,
} from "../controllers/testcasesController.js";
import { useInRouterContext } from "react-router-dom";

const router = express.Router();

router.post("/add" , addATestcase);

router.get("/get/:problemId" , getAllTestcasesForAProblem);

router.put("/update/:_id" , updateATestcase);

router.delete("/delete/:id" , deleteATestcase);

export default router;
