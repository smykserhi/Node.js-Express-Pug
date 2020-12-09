//This file separate routes and ather parts of app 
const express = require("express")
//create new router
const router = express.Router();
//conect data.json
//next two lones means the same ES6 featuries
//const data = require("../data/fleshCardData.json").data 
const {data} = require("../data/fleshCardData.json")
//set up cards from data
//next two lines means the same
// const cards = data.cards
const {cards} = data

//This file execute only in "/cards" path so root path would be "/""
// "/:id" means that id is parmeter and will uses like varieble "req.params.id"
router.get('/:id', (req, res)=>{
    //store query to varieble
    const {side} = req.query
    const {id} = req.params
    const text = cards[id][side]
    const {hint} = cards[id]
    const templateData = {text, hint}
    //render cards.pug
    res.render('cards', templateData)
})
//chould export it
module.exports = router