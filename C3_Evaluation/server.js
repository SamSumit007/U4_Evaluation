const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

const connect = ()=>{
    return mongoose.connect("mongodb://127.0.0.1:27017/book")
}
const UserSchema = new mongoose.Schema({
    firstname : {type : String, required : true},
    lastName: {type : String, required : fasle},
    age:{type : Number, required : false},
    email: {type : String, required : true, unique:true},
    password: { type: String, required: true },
    profilePic: [{ type: String, required: false }],
},
{

    timestamps: true,

});

const User = mongoose.model("user", sectionSchema);

const bookSchema = new mongoose.Schema({
    likes:{type: Number, required:true},
    coverimage:{type:String, required:true},
    content:{type:String, required:true},
    user_name:{type : mongoose.Schema.Types.ObjectId, ref : "user", required : true}
});
const Book = mongoose.model("book", bookSchema);



const publicationSchema = new mongoose.Schema({
    name: { type :String, required:true },

    book_id:{type : mongoose.Schema.Types.ObjectId, ref:"book", required:true},

},

    {

        timestamps: true,
})


const publication = mongoose.model("publication", publicationSchema)



const commentSchema = new mongoose.Schema({
    body:{type:String, required:true},
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
      book_id:{type : mongoose.Schema.Types.ObjectId, ref:"book", required:true},

}, 
   {

        timestamps: true,
});


const comment = mongoose.model("comment", commentSchema)





app.post(
    "/users",
    // body('username').isEmail(),
    body("firstName")
      .trim()
      .not()
      .isEmpty()
      .bail()
      .withMessage("First Name cannot be empty")
      .isLength({ min: 3 })
      .withMessage("First Name must be at least 3 characters"),
    body("email")
      .isEmail()
      .custom(async (value) => {
        const user = await User.findOne({ email: value });
  
        if (user) {
          throw new Error("Email is already taken");
        }
        return true;
      }),
    body("age")
      .not()
      .isEmpty()
      .withMessage("Age cannot be empty")
      .isNumeric()
      .withMessage("Age must be a number between 1 and 150")
      .custom((val) => {
        if (val < 1 || val > 150) {
          throw new Error("Incorrect age provided");
        }
        return true;
      }),
  
      body("password")
    .not()
    .isEmpty()
    .withMessage("Password is required")
    .custom((value) => {
      const password = /^(?=.*\d)(?=.*[a-z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,12}$/;
      if (!value.match(password)) {
        throw new Error("Password must be strong");
      }
      return true;
    })
    .custom((value, { req }) => {
      if (value !== req.body.confirmPassword) {
        throw new Error("Password and confirm password should match");
      }
      return true;
    }),
    
 
    
    
    body("lastName").custom((value) => {
      if (value && value.length < 3) {
        throw new Error("Last Name if provided must be at least 3 characters");
      }
      return true;
    }),
    async (req, res) => {
      try {
        console.log(body("firstName"));
        const errors = validationResult(req);
        console.log({ errors });
        if (!errors.isEmpty()) {
          return res.status(400).send({ errors: errors.array() });
        }
  
        const user = await User.create(req.body);
  
        return res.status(201).send(user);
      } catch (err) {
        return res.status(500).send({ message: err.message});
      }
    }
  );
  
  app.post("/book", async (req, res)=>{
    const book = await Book.create(req.body)

    return res.status(201).send({book})
});

app.get("/book", async (req,res)=>{
    const book = await Book.find().populate("user_name").lean().exec()
    res.status(200).send({book})
});


app.post("/comment", async(req,res)=>{
    const comment = await Comment.create(req.body);
    return res.status(201).send({comment})
})
app.get("/comment", async (req,res)=>{
    const comment = await Comment.find().populate("user_id").populate("book_id").lean().exec();
    res.status(200).send({comment})
});








  app.listen(4321, async (req,res)=>{
    await connect();
    console.log("Listening to port 4321");
});