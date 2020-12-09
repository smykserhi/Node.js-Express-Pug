const express = require("express"); //import express
//import body parser
const bodyParser = require("body-parser")
//import cookiesOarser
const cookieParser = require("cookie-parser");
const { req } = require("express");

const app = express() //set up express to app
//set up body parser work with request body
app.use(bodyParser.urlencoded({ extended: false} ))
//use cookie parser
app.use(cookieParser())
//set up Express use Pug
app.set('view engine', 'pug')

//Connect another JS file with routes
const mainRoutes = require("./router/index")
const cardRoutes = require("./router/cards") //if js file name index.js no need put it to path
app.use(mainRoutes)
//if called /cards from client use this routs
app.use("/cards", cardRoutes) 

/*Midlewaire*/
//will execude in every request 
app.use((req, res, next) =>{
    console.log("Every request")
    
    next() //should call next 
})
//will execude evry request to /hello rougt
app.use("/error", (req, res, next) =>{
    console.log("Every error")
    const err = new Error("Ops!!!")
    //set up status code to error
    err.status = 500
    //pass err to next() execute error function
    next(err) //should call next 
})

//404 Error hendeling. If eny function above will not execute(it shold be last function before error hendler)
app.use((req, res, next)=>{
    const err = new Error("Not fond")
    err.status = 404
    next(err)
})

//Error hendler 
app.use((err, req, res, next )=>{
    res.locals.error = err;
    //set up ctatus code  to response
    res.status(err.status)
    //render error page
    res.render("error")
})
app.listen(3000, ()=>{
    console.log("Application start in localhost:3000")
}) //listen localgost:3000 port