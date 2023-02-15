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

    try{

        let newUser =  new User({name, email, password});
        await newUser.save();
        res.json({email});

    }catch(err) {
        res.sendStatus(500)
        console.log(err)
    }
})

module.exports = app;