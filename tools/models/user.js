"use strict";

let mongoose = require("mongoose");
let bcrypt = require("bcrypt");

let userSchema = new mongoose.Schema({
    email: {type: String},
    password: {type: String}
});


userSchema.statics.authenticate = (loginData, callback) => {
    User.findOne({ email : loginData.email }, function (error, databaseUser) {
        if (error || !databaseUser || databaseUser.password !== loginData.password) {
            return callback(error || {error: "Login Information is Invalid."});
        }
        return callback(null, databaseUser);
    });
};

let User = mongoose.model("User", userSchema);


//User.create({email: "test@test.com", password: "test"});

module.exports = User;