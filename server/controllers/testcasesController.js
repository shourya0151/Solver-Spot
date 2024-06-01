import { TestcaseModel } from "../models/testCasesModel.js";

const getAllTestcasesForAProblem = async(req , res) => {
    try{
        const {problemId} = req.params;
        const testcases = await TestcaseModel.find({problem:problemId});
        return res.status(200).json({testcases});
    }

    catch(err)
    {
        console.log(err.message);
        return res.status(500).json({error:err,message});
    }
};

const addATestcase = async(req , res) => {
    try{
        const testcaseData = req.body;
        const testcase = await TestcaseModel.create(testcaseData);
        return res.status(200).json({testcase});
    }
    catch(err)
    {
        console.log(err.message);
        return res.status(500).json({error:err,message});
    }
};

const updateATestcase = async(req , res) => {
    try{
        const{_id} = req.params;
        const testcaseData = req.body;
        const testcase = await TestcaseModel.findByIdAndUpdate(_id , testcaseData , {new :true});
        return res.status(200).json({testcase});
    }
    catch(err)
    {
        console.log(err.message);
        return res.status(500).json({error:err,message});
    }
};

const deleteATestcase = async(req , res) => {
    try{
        const {_id} = req.params;
        await TestcaseModel.findByIdAndDelete(_id);
        return res.status(200).json({ message: "Testcase Deleted Successfully!!" });
    }
    catch(err)
    {
        console.log(err.message);
        return res.status(500).json({error:err,message});
    }
};

export {
    getAllTestcasesForAProblem,
    addATestcase,
    deleteATestcase,
    updateATestcase,
  };