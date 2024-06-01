import express from "express";

import{deleteProblem , updateProblem, addproblem , getParticularProblem , getAllProblems} from "../controllers/problemcontroller.js";

const router = express.Router();

router.get('/' , getAllProblems);
router.get("/:_id" , getParticularProblem);
router.post("/add" , addproblem);
//for update api call is put
router.put("/update/:_id" , updateProblem);
//for delete it's delete
router.delete("/delete/:_id" , deleteProblem);

export default router;
