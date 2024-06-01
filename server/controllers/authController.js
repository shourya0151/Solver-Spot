//import UserModel from models
import { UserModel } from "../models/userModel.js";

//sign-in function
const signin = async(req , res) => {
    /* 
    body{
        email:email , 
    }
    */
    try{
        const userData = req.body;
        console.log(userData);
        const user = await UserModel.findByEmailOrUsernameAndPassword(userData);
        const token = user.generateJwtToken();
        return res.status(200).json({token , success:true});
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json({error:err.message , key:"error"});
    }
};

const signup = async(req , res) => {

    try{
        const userData = req.body;
        //throws error if user already there
        await UserModel.findByEmailAndUserName(userData);
        //create user with given data
        const user = await UserModel.create(userData);
        //generate token
        const token = user.generateJwtToken();

        return res.status(200).json({token , success:true});
    }
    catch(err)
    {
        console.log(err.message);
        return res.status(500).json({error : err.message});
    }
};

export {signin , signup};
