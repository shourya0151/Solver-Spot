import { ProblemModel } from "../models/problemsModel.js";


//getting all problems from db
const getAllProblems = async (req, res) => {
    try {
        const problemList = await ProblemModel.find({});
        return res.status(200).json({ problemList });
    }
    catch (err) {
        console.log(err.message);
        return res.status(500).json({ error: err.message });
    }
};

//get particular problem
const getParticularProblem = async (req, res) => {

    try {
        const { _id } = req.params;
        //find tht problem using id
        const problem = await ProblemModel.findOne({ _id });
        return res.status(200).json({problem});
    }
    catch(err)
    {
        console.log(err.message);
        return res.status(500).json({ error: err.message });
    }
    
};

//adding problem
const addproblem = async(req , res)=>{
    
    try{
        //get problem body
        const problemBody = req.body;
        const problem = await ProblemModel.create(problemBody);
        return res.status(200).json({problem});
    }
    catch(err)
    {
        console.log(err.message);
        return res.status(500).json({error:err.message});
    }
};

//updating a problem
const updateProblem = async(req , res)=>{
    console.log("updating");
    try{
        
        const {_id} = req.params;
        const problemData = req.body;
        const problem = await ProblemModel.findByIdAndUpdate({_id} , problemData , {new:true});
        return res.status(200).json({problem});
    }
    catch(err)
    {
        console.log(err.message);
        return res.status(500).json("error");
    }
};

//delete a problem
const deleteProblem = async(req , res)=>{
    console.log("removing");
    try{
        const {_id} = req.params;
        const problem = await ProblemModel.findOne({_id});
        //check if this removes or not
        //await problem.remove();
        await ProblemModel.findByIdAndDelete({_id});
        return res.status(200).json({message:"successful"});
    }
    catch(err)
    {
        console.log(err.message);
        console.log('here');
        return res.status(500).json({error:err.message});
    }
};

export{
    deleteProblem , updateProblem, addproblem , getParticularProblem , getAllProblems
};



