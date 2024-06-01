import mongoose from "mongoose";

//scehma for problem
const problemSchema = mongoose.Schema(
    {
        title:{type : String , required:true},
        author:{type:String},
        statement:{type:String , required:true},
        example:[{input:String , output:String,  explanation:String}]
    },
    {
        timestamp:true
    }
);

export const ProblemModel = mongoose.model("problems" , problemSchema);
