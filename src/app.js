const express = require("express");
const app = express();
const mongoose = require("mongoose");
const user = require("./models/User");

app.use(express.urlencoded({extended: false}));
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/pics", {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        //console.log("Conectando com o banco");
    }).catch(err => {
        console.log(err);
    })

const User = mongoose.model("User", user);

app.get("/", (req, res) => {
    res.json({success: true});
})

app.post("/user", async (req, res) => {
    
    let {name, email, password} = req.body;

    if(name == '' || email == '' || password == ''){
        res.sendStatus(400);
        return;
    }
    try{
        let user = await User.findOne({"email": email})
        if(user != undefined){
            res.statusCode = 400;
            res.json({error: "E-mail já cadastrado"})
            return;
        }
        let newUser =  new User({name, email, password});
        await newUser.save();
        res.json({email});

    }catch(err) {
        res.sendStatus(500)
        console.log(err)
    }
})

module.exports = app;