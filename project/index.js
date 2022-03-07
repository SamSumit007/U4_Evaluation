const express = require("express");
const app = express();


app.use(logger);
app.use(checkPermission)

app.get("/books", logger,(req, res)=>{
    return res.send({ route: "/books"})
} );
app.get("/librarian", logger,  checkPermission, (req, res)=>{
    return res.send({ route: "/librarian", permission: true})
} );

app.get("/author", logger, checkPermission, (req, res)=>{
    return res.send({ route: "/author", permission: true})
} );

function logger(req, res, next){
    console.log("log request path");
    next();
}
function checkPermission(req, res, next){
    console.log("permission");
    next();
}

app.listen(4004, () =>{
    console.log("Listning");
});