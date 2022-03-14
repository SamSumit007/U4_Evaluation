const { application } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const app = express();


app.user(express.json());


const connect =() =>{
    return mongoose.connect("mongodb://localhost:27017/web-15");
};

//schema

const userSchema = new mongoose.Schema(
    { first_name:{type: String, required: true},
    middle_name:{type: String, required: false},
    last_name:{type: String, required: true},
    age:{type: Number, required: true},
    email:{type: String, required: true},
    addres:{type: String, required: true},
    gender:{type: String, default:female, required: false},
    type:{type: String, default:customer, required: false}
    },
    {
        versionKey: false,
        timestamps: true,
    }
);
const User = mongoose.model("user", userSchema);


const BranchDetailSchema = new mongoose.Schema(
    { name:{type: String, required: true},
   
    addres:{type: String, required: true},
    IFSC:{type: String, required: true},
    MICR:{type: Number, required: true},
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

const BranchDetail = mongoose.model("branchDetail", BranchDetailSchema);


const MasterAccountSchema = new mongoose.Schema(
    { balance:{type: Number, required: true},

    userId:{ type: mongoose.Schema.Types.ObjectId, 
        ref: "user", required: true,

    },
   
   
 
   
    },
    {
        versionKey: false,
        timestamps: true,
    }
);
const MasterAccount = mongoose.model("masterAccount", MasterAccountSchema);

const SavingsAccountSchema = new mongoose.Schema(
    { account_number:{type: Number, required: true},
   
    balance:{type: Number, required: true},
    interestRate:{type: Number, required: true},
    branchDetailId:{ type: mongoose.Schema.Types.ObjectId, 
        ref: "branchDetail", required: true,

    }
    
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

const SavingsAccount = mongoose.model("savingsAccount", SavingsAccountSchema);

const FixedAccountSchema = new mongoose.Schema(
    { account_number:{type: Number, required: true},
   
    balance:{type: Number, required: true},
    interestRate:{type: number, required: true},
   startDate:{type: Date, required: true},
   matuatityDate:{type: Date, required: true},
    
    MasterAccount :
    {type: mongoose.Schema.Types.ObjectId, 
        ref: "masterAccount", required: true},
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

const FixedAccount = mongoose.model("fixedAccount", FixedAccountSchema);


app.get("/users", async (req,res)=>{
    try{
        const user = await User.find().lean().exec();
        return res.status(200).send({users: users});
    }catch(err){
        return res.status(500).send({messege: "something wrong"})
    }
});


app.get("/masterAccount", async (req,res)=>{
    try{
        const masterAccount = await MasterAccount.find().lean().exec();
        return res.status(200).send({users: users});
    }catch(err){
        return res.status(500).send({messege: "something wrong"})
    }
});

app.post("/users", async (req,res)=>{
    try{
        const user = await User.create(req.account_number);
        return res.status(201).send(user);
    }catch(err){
        return res.status(500).send({messege: err.messege})
    }
});

app.get("/masterAccount/:id", async (req,res)=>{
    try{
        const masterAccount = await MasterAccount.findById(req.params.id).lean().exec();
        return res.status(200).send(masterAccount);
    }catch(err){
        return res.status(500).send({messege: "something wrong"})
    }
});


app.listen(4321, async () =>{
    try{
        await connect();
    }catch (err){
        console.log('err:', err)

    }
    console.log("listning")
})