import mongoose from "mongoose";

const testcaseSchema = mongoose.Schema(
    {
        problem:{type:mongoose.Types.ObjectId , ref : "problems"},
        input : {type :String , requires:true},
        output : {type :String , requires:true},
        isExample : {type : Boolean , default : false}
    }
    ,
    {
        timestamps : true,
    }
);

export const TestcaseModel = mongoose.model("Testcases" , testcaseSchema);
