const express = require("express");
const app = express();


 app.use(logger);
 app.use(checkPermission);

app.get("/books", logger,(req, res)=>{
    return res.send({ route: "/books"})
} );
app.get("/libraries", logger,    (req, res)=>{
    return res.send({ route: "/libraries", permission: true, role: req.role})
} );

app.get("/authors", logger,   (req, res)=>{
    return res.send({ route: "/authors", permission: true, role: req.role})
} );




function logger(req, res, next){

    if(req.path === "/libraries"){
        req.role = "permission: true";
    }else if(req.path === "/authors" ){
        req.role = "permission: true";

    }

    console.log("log request path");
    next();
}
function checkPermission(role){
    return 
    function logger(req, res, next){

        if(role === "librarian"){
            return next();
        }
        else if(role === "author"){
            return next();
        }
        return res.send("Barred")
    }
}

app.listen(4004, () =>{
    console.log("Listning");
});