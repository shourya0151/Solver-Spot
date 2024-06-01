import { executeCpp, generateFile } from "../forCompiler/fileHelper.js";
import { ProblemModel } from "../models/problemsModel.js";
import { SolutionModel } from "../models/solutionModel.js";
import { TestcaseModel } from "../models/testCasesModel.js";

const addASolution = async (req, res) => {
  try {
    const solutionData = req.body;
    const _id = req.session.passport.user._doc._id;
    const solution = await SolutionModel.create({
      submittedBy: _id,
      ...solutionData,
    });
    return res.status(200).json({ solution });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

const getAllSolutionsForAParticularUserForAProblem = async (req, res) => {
  try {
    const { problemId , userId } = req.params;
    const solutions = await SolutionModel.find({
      problem: problemId,
      submittedBy: userId,
    });
    return res.status(200).json({ solutions });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

const runAProblem = async (req, res) => {
  try {
    const { language = "cpp", code } = req.body;
    const { problemId } = req.params;
    const userId = req.session.passport.user._doc._id;

    const testcases = await TestcaseModel.find({
      problem: problemId,
      isExample: true,
    });


    if (!code) {
      return res.status(404).json({ success: false, error: "Empty code !!" });
    }

    for (let i = 0; i < testcases.length; i++) {
      const testcase = testcases[i];
      const filePath = await generateFile(language, code);
      const output = await executeCpp(filePath, testcase.input);
      const pureStringOutout = output.replace(/(?:\r\n|\r|\n)/g, "");
      const pureStringtestcaseOutput = testcase.output.replace(
        /(?:\r\n|\r|\n)/g,
        ""
      );
      const success =
        pureStringOutout.toLowerCase() ==
        pureStringtestcaseOutput.toLowerCase();
      if (!success) {
        return res.status(200).json({
          verdict: "Failed",
          message: `Wrong Answer on testcase ${i + 1}`,
        });
      }
    }

    return res
      .status(200)
      .json({ verdict: "Passed", message: `All Example testcases Passed` });
  } catch (error) {
    console.log(error.stderr);
    return res.status(500).json({ error: error.stderr});
  }
};

const submitAProblem = async (req, res) => {
  /* console.log(req.body.code); */
  try {
   
    const language = 'cpp';
    const code = req.body.code;

    const { problemId } = req.params;
    const userId = req.session.passport.user._doc._id;
    console.log(userId);
    const testcases = await TestcaseModel.find({
      problem: problemId,
    });

    
    console.log(testcases);
    if (!code) {
      return res.status(404).json({ success: false, error: "Empty code !!" });
    }

    if(!userId)return res.status(500).json({success:false , error:"not authorized"});

    for (let i = 0; i < testcases.length; i++) {
      const testcase = testcases[i];
      //yaha error hai -> The "path" argument must be of type string. Received undefined
      
      const filePath = await generateFile(language, code);
      const output = await executeCpp(filePath, testcase.input);
      const pureStringOutout = output.replace(/(?:\r\n|\r|\n)/g, "");
      const pureStringtestcaseOutput = testcase.output.replace(
        /(?:\r\n|\r|\n)/g,
        ""
      );
      
      const success =
        pureStringOutout.toLowerCase() ==
        pureStringtestcaseOutput.toLowerCase();

      if (!success) {
        const solution = await SolutionModel.create({
          problem: problemId,
          verdict: "Failed",
          message: `Wrong Answer on testcase ${i + 1}`,
          submittedBy: userId,
          submittedAt: new Date(),
        });
        const message = "Wrong answer on testcase " + `${i+1}`
        const tt = testcase.input;
        return res.status(200).json({ solution , message:message , tt:tt});
      }
    }
    const solution = await SolutionModel.create({
      problem: problemId,
      verdict: "Passed",
      message: `Accepted`,
      submittedBy: userId,
      submittedAt: new Date(),
    });
    const message = "Congratulations you got it!!!"
    return res.status(200).json({ solution , message:message });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};

export {
  addASolution,
  getAllSolutionsForAParticularUserForAProblem,
  runAProblem,
  submitAProblem,
};