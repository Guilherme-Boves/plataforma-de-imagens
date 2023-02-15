const express = require("express");
const app = express();
const mongoose = require("mongoose");
const user = require("./models/User");
const bcrypt = require("bcrypt");

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
        
        let salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(password,salt);

        let newUser =  new User({name, email, password: hash});
        await newUser.save();
        res.json({email});

    }catch(err) {
        res.sendStatus(500)
        console.log(err)
    }
})

module.exports = app;