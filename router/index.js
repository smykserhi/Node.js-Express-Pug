//This file separate routes and ather parts of app 
const express = require("express")
//create new router
const router = express.Router();

//when call link 
router.get("/", (request, response) =>{
    //send response 
    // response.send("<h1>It works</h1>")
    //if name exist in cookies 
    if(request.cookies.name){
        //render index.pug with cookies name
        response.render("index" , { name: request.cookies.name})
     //else redirect to hello page
    }else response.redirect('/hello')
    
})
//when called /info path
router.get("/hello", (request, response) =>{
    //send response
    //if in request exist name 
    if(request.cookies.name){
        //redirect to main page
        response.redirect('/' )
    //else render hello.pug
    }else response.render("hello")
})
//when form submited need to use post method
router.post("/hello", (request, response) =>{
    //send response
    // console.dir(request.body) //print request body property
    // send cookies to browser
    response.cookie("name", request.body.name)
    response.redirect("/")
    //send JSON as response
    //response.json(request.body)
})
router.post("/clear", (req, res)=>{
    res.clearCookie("name")
   
   res.redirect("/")
})
router.get("/clear" , (req,res)=>{
   res.redirect("/") 
    
})

module.exports = router