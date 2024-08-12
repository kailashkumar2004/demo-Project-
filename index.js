const mongoose = require("mongoose");
const express = require("express");
const db = require("./src/db/database");
const { User } = require("./src/model/module");
const PORT = 3000;
const app = express();
app.use(express.json());


app.get("/", (req, res) => {
    res.send("Helo duniya")
});


app.post("/createUser", async (req, res) => {
    const newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        date: req.body.date,
        addresh: req.body.addresh,
        phoneNu: req.body.phoneNu,
        time: req.body.time
    };
    console.log("newUser-----------><", newUser);
    const existingUser = await User.findOne({ email: req.body.email });
    console.log("existingUser--------><", existingUser);
    if (existingUser) {
        return res.status(401).json({
            msg: "email allready create"
        });
    };
    const saveUser = new User(newUser);
    console.log("saveUser---------><", saveUser);
    if (!saveUser) {
        return res.status(402).json({
            msg: "user are not created"
        });
    };
    const response = await saveUser.save();
    return res.status(200).json({
        msg: "user create sucessfully",
        result: response
    });
});
app.get("/allUser", async (req, res) => {
    const { page = 1 } = req.query;
    const limit = 2;
    const skip=(page-1)*limit
    const alluser = await User.find().limit(limit).skip(skip).sort({createdAt:-1});
    console.log("alluser-----------><", alluser);
    if (!alluser) {
        throw "user are not recived"
    };
    return res.status(200).json({
        msg: "okk sucess user recived",
        count: alluser.length,
        result: alluser
    });
});
app.get("/getUserById/:id", async (req, res) => {
    const id = req.params.id;
    console.log("id=============><", id);
    const getUser = await User.findById(id);
    console.log("getUser-------><", getUser);
    if (!getUser) {
        return res.status(401).json({
            msg: "user are not geted"
        });
    };
    return res.status(200).json({
        msg: "okk sucess",
        result: getUser
    });
});
app.put("/updateUserById/:id", async (req, res) => {
    const id = req.params.id;
    console.log("id================><", id);
    const body = req.body;
    const updateUser = await User.findByIdAndUpdate(id, { $set: body }, { new: true });
    console.log("updateUser-------<>", updateUser);
    if (!updateUser) {
        return res.status(401).json({
            msg: "user are not update"
        });
    };
    return res.status(200).json({
        msg: "user update sucess",
        result: updateUser
    });
});
app.delete("/deleteUserById/:id", async (req, res) => {
    const id = req.params.id;
    console.log("id===============><", id);
    const deleteUser = await User.findByIdAndDelete(id);
    console.log("deleteUser---------><", deleteUser);
    if (!deleteUser) {
        return res.status(401).json({
            msg: "user are not deleted"
        });
    };
    return res.status(200).json({
        msg: "user deleted sucessfully",
        result: deleteUser
    });
});
app.post("/searchUser", async (req, res) => {
    const body = req.body;
    const searchUser = await User.find(body);
    console.log("searchUser---------><", searchUser);
    if (!searchUser) {
        return res.status(401).json({
            msg: "user are not search"
        });
    };
    return res.status(200).json({
        msg: "okk sucess",
        count: searchUser.length,
        result: searchUser
    });
});
app.post("/searchWithFirstName", async (req, res) => {
    const searchUser = await User.findOne({ firstName: req.body.firstName });
    console.log("searchUser--------><", searchUser);
    if (!searchUser) {
        return res.status(401).json({
            msg: "user not find"
        });
    };
    return res.status(200).json({
        msg: "okk sucess",
        result: searchUser
    });
});
app.listen(PORT, () => {
    console.log(`server is runing on at PORT ${PORT}`)
});