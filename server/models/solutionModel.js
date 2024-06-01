import mongoose from "mongoose";

const solutionSchema = mongoose.Schema({
    //give reference to problem
    //this schema is connected to problem schema now
    problem: {type:mongoose.Types.ObjectId , ref:"problems"},
    verdict : {type:String , enum:["Passed" , "Failed"]},
    submissionDate : Date,
    //give reference to user model
    submittedBy: {type:mongoose.Types.ObjectId , ref:"users"}
});

export const SolutionModel = mongoose.model("Solutions" , solutionSchema);