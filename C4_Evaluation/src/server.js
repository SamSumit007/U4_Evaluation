const express = require("express");
const connect = require("./configs/db");


const userController = require("./controllers/user.controller")
 const TodoController = require("./controllers/todo.controller")

 const {register,login} = require("./controllers/auth.controller")


const app = express();

app.use(express.json());


 app.use("/users", userController)

app.post("/register", register)

 app.post("/login", login)

app.use("/todo", TodoController)







  
  




   
    
    app.listen(4321, async () => {
        try{
            await connect();
            console.log("listening on port 4321")
        }
        catch(err){
            console.log(err.message);
        }
    });