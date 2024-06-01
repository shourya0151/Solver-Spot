import mongoose from "mongoose";

export default async()=>{
    return mongoose.connect( "mongodb://localhost:27017", {useNewUrlParser:true});
}

//connects backend with db