import mongoose from "mongoose";
//for generating jwt token
import jwt from "jsonwebtoken";
//encrypt password
import bcrypt from "bcrypt";


//schema for user
const userSchema = mongoose.Schema(
    {
        name: { type: String },
        //required : true -> required without this you cant sign in
        userName: { type: String, required: true },
        email: { type: String, required: true },
        //enum -> only these options are there
        role: { type: String, enum: ["user", "admin", "owner"] },
        password: { type: String, required: true }
    },
    {
        timestamps: true,
    }

);

//genrating jwt token
userSchema.methods.generateJwtToken = function () {
    //user gets id for current user , string can be anything
    return jwt.sign({ user: this._id.toString() }, "OJProject");
};

//schema.statics.function
//email -> jai@ , 
userSchema.statics.findByEmailAndUserName = async ({ email, userName }) => {
    //checking if email already exist or not
    const userByEmail = await UserModel.findOne({ email });
    //same for user name
    const userByUserName = await UserModel.findOne({ userName });

    if (userByEmail || userByUserName) {
        throw new Error("User with same credentials already there");
    }
    return 0;
};

userSchema.statics.findByEmailOrUsernameAndPassword = async ({ email, userName, password }) => {
    //if email is there or not
    //if this user exit karta hai toh pura data aa jaega
    const user = await UserModel.findOne({ email });
    if (!user) throw new Error("No such account found");

    if (user.userName != userName) throw new Error("No such account found");

    //check for password
    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword) throw new Error("Invalid Password");

    //else everthing is fine
    return user;
};

//now for encrypting password
// pre("string" , next) => what to before that string operation then what to do after that is next

userSchema.pre("save", function (next) {

    //gets current user
    const user = this;

    if (!user.isModified("password")) return next();

    //generate bcrypt salt
    bcrypt.genSalt(6, (error, salt) => {
        if (error) return next(error);

        //hash the password
        bcrypt.hash(user.password, salt, (error, hash) => {
            if (error) return next(error);

            //make the password hashed
            user.password = hash;
            return next();
        });
    });
});


export const UserModel = mongoose.model("users", userSchema);
